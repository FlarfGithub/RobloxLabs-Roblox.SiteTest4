export class RefreshAhead<TEntity> {
	public constructor(entity: TEntity) {}
	public ConstructAndPopulate(refreshInterval: int, refreshDelegate: () => TEntity | TEntity[]) {
		refreshDelegate();
	}
}
