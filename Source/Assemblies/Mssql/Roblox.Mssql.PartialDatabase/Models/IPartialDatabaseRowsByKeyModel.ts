import { IPartialDatabaseRowsByKeyValueModel } from './IPartialDatabaseRowsByKeyValueModel';

export interface IPartialDatabaseRowsByKeyModel<TEntity, TKey extends keyof TEntity, TValue extends TEntity[TKey]> {
	/*IPartialDataBaseRowsByKeyValueModel<TEntity, TKey, TValue>[]*/ Data: IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TValue>[];
}
