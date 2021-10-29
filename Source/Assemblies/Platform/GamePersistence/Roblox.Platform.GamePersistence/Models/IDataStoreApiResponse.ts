import { IDataStoreRespose } from './IDataStoreRespose';

export interface IDataStoreApiResponse {
	/*String*/ ISODate: String;
	/*String*/ Message: String;
	/*Array<IDataStoreRespose>*/ Data: Array<IDataStoreRespose>;
}
