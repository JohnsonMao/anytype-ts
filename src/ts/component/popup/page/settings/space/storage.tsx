import * as React from 'react';
import { observer } from 'mobx-react';
import { Label, Title, ListObjectManager } from 'Component';
import { analytics, C, UtilFile, I, translate, UtilCommon } from 'Lib';
import { popupStore } from 'Store';
import Constant from 'json/constant.json';

import Head from '../head';

const PopupSettingsPageStorageManager = observer(class PopupSettingsPageStorageManager extends React.Component<I.PopupSettings, {}> {

    refManager: any = null;

    constructor (props: I.PopupSettings) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
    };

    render () {
        const buttons: I.ButtonComponent[] = [
            { icon: 'remove', text: 'Delete immediately', onClick: this.onRemove }
        ];
        const filters: I.Filter[] = [
            { operator: I.FilterOperator.And, relationKey: 'fileSyncStatus', condition: I.FilterCondition.Equal, value: I.FileSyncStatus.Synced },
        ];
		const sorts: I.Sort[] = [
			{ type: I.SortType.Desc, relationKey: 'sizeInBytes' },
		];

        const Info = (item: any) => (
            <React.Fragment>
                <Label text={String(UtilFile.size(item.sizeInBytes))} />
            </React.Fragment>
        );

        return (
            <div className="wrap">
                <Head onPage={this.onBack} name={translate('commonBack')} />
                <Title text={translate('popupSettingsSpaceStorageManagerTitle')} />

                <ListObjectManager
                    ref={ref => this.refManager = ref}
                    subId={Constant.subId.files}
                    rowLength={2}
                    withArchived={true}
                    buttons={buttons}
                    Info={Info}
                    iconSize={18}
                    sorts={sorts}
                    filters={filters}
                    textEmpty={translate('popupSettingsSpaceStorageManagerEmptyLabel')}
                />
            </div>
        );
    };

    onRemove () {
        if (!this.refManager) {
            return;
        };

        const count = this.refManager.selected.length;

        analytics.event('ShowDeletionWarning', { route: 'Settings' });

        popupStore.open('confirm', {
            data: {
                title: UtilCommon.sprintf(
                    translate(`popupSettingsSpaceStorageManagerDeletionWarningTitle`),
                    count,
                    UtilCommon.cntWord(count, translate(`popupSettingsSpaceStorageManagerDeletionWarningTitleObject`), translate(`popupSettingsSpaceStorageManagerDeletionWarningTitleObjects`))
                ),
                text: translate(`popupSettingsSpaceStorageManagerDeletionWarningText`),
                textConfirm: translate(`popupSettingsSpaceStorageManagerDeletionWarningConfirm`),
                onConfirm: () => {
					C.ObjectListSetIsArchived(this.refManager?.selected, true, () => {
						C.ObjectListDelete(this.refManager?.selected);

						this.refManager.selectionClear();
						analytics.event('RemoveCompletely', { count, route: 'Settings' });
					});
                },
                onCancel: () => this.refManager.selectionClear()
            },
        });
    };

    onBack = () => {
        this.props.onPage('spaceIndex');
    };
});

export default PopupSettingsPageStorageManager;