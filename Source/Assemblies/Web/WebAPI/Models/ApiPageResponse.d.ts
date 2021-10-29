declare namespace Roblox.Web.WebAPI.Models {
	class ApiPageResponse<TClass> {
		public previousPageCursor: String;
		public nextPageCursor: String;
		public data: TClass[];
	}
}
