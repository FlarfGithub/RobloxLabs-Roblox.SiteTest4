export interface IPartialDatabaseSetValuesModel<TEntity, TKey extends keyof TEntity, TValue extends TEntity[TKey]> {
	/*TKey*/ Key: TKey;
	/*TValue*/ Value: TValue;
}
