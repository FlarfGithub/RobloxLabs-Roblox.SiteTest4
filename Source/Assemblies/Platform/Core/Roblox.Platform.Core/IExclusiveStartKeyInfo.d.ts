declare namespace Roblox.Platform.Core {
	interface IExclusiveStartKeyInfo<TCountType> {
		public readonly SortOrder: Roblox.DataV2.Core.SortOrder;
		public readonly PagingDirection: Roblox.DataV2.Core.PagingDirection;
		public readonly Count: TCountType;
	}
}
