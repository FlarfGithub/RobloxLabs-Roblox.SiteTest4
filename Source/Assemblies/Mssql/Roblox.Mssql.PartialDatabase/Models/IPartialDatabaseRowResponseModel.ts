import { IPartialDatabaseRowsByKeyModel } from './IPartialDatabaseRowsByKeyModel';

export interface IPartialDatabaseRowResponseModel<TEntity, TKey extends keyof TEntity, TValue extends TEntity[TKey]> {
	/*IPartialDataBaseRowsByKeyModel<TEntity, TKey, TValue>[]*/ Rows: IPartialDatabaseRowsByKeyModel<TEntity, TKey, TValue>[];
}
