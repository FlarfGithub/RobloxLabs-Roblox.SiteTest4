declare namespace Roblox.Web.WebAPI {
	class ExclusiveStartRequest<TCountType> {
		public readonly ExclusiveStartKeyInfo: Roblox.Platform.Core.IExclusiveStartKeyInfo<TCountType>;
		public readonly CursorRecipe: String;
	}
}
