export enum AccountStatusType {
	Active			 = 0,
    PendingDeletion	 = 1,
	StartedDeletion	 = 2,
    Deleted			 = 3,
};

export interface Account {
	id: string;
	info?: AccountInfo;
	config?: AccountConfig;
	status?: AccountStatus;
};

export interface AccountInfo {
	homeObjectId: string;
	profileObjectId: string;
	gatewayUrl: string;
	deviceId: string;
	localStoragePath: string;
	accountSpaceId: string;
	widgetsId: string;
	analyticsId: string;
};

export interface AccountConfig {
};

export interface AccountStatus {
	type: AccountStatusType;
	date: number;
};