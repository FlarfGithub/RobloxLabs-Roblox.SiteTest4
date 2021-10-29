declare namespace Roblox.Platform.Assets {
	interface IAssetResponseItem {
		public Location: System.String;
		public Errors: IAssetItemError[];
		public RequestId: System.String;
		public IsHashDynamic: System.Boolean;
		public IsCopyrightProtected: System.Boolean;
		public readonly IsArchived: System.Boolean;
	}
}
