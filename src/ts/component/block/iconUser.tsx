import * as React from 'react';
import { observer } from 'mobx-react';
import { IconObject, Loader } from 'Component';
import { I, UtilObject } from 'Lib';
import { detailStore } from 'Store';

interface State {
	isLoading: boolean;
};

const BlockIconUser = observer(class BlockIconUser extends React.Component<I.BlockComponent, State> {

	state = {
		isLoading: false,
	};

	constructor (props: I.BlockComponent) {
		super(props);
		
		this.onSelect = this.onSelect.bind(this);
		this.onUpload = this.onUpload.bind(this);
	};

	render (): any {
		const { isLoading } = this.state;
		const { rootId, readonly } = this.props;

		return (
			<div className="wrap">
				{isLoading ? <Loader /> : ''}
				<IconObject
					id={`block-icon-${rootId}`} 
					getObject={() => detailStore.get(rootId, rootId, [])}
					className={readonly ? 'isReadonly' : ''}
					canEdit={!readonly}
					onSelect={this.onSelect}
					onUpload={this.onUpload}
					size={128}
				/>
			</div>
		);
	};

	onSelect () {
		this.setLoading(true);
		UtilObject.setIcon(this.props.rootId, '', '', () => this.setLoading(false));
	};

	onUpload (objectId: string) {
		this.setLoading(true);
		UtilObject.setIcon(this.props.rootId, '', objectId, () => this.setLoading(false));
	};

	setLoading (v: boolean) {
		this.setState({ isLoading: v });
	};
	
});

export default BlockIconUser;