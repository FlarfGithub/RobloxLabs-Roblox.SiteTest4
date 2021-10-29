export interface IPartialDatabaseRowsByKeyValueModel<TEntity, TKey extends keyof TEntity, TValue extends TEntity[TKey]> {
	/*TKey*/ Key: TKey;
	/*TValue*/ Value: TValue;
	/*Boolean*/ IsPrimary: boolean;
}
