declare namespace Roblox.Caching {
	declare interface ICacheabilitySettings {
		readonly CollectionsAreCacheable: System.Boolean;
		readonly CountsAreCacheable: System.Boolean;
		readonly EntityIsCacheable: System.Boolean;
		readonly IDLookupsAreCacheable: System.Boolean;
		readonly IsNullCacheable: System.Boolean;
		readonly HasUnqualifiedCollections: System.Boolean;
		readonly IDLookupsAreCaseSensitive: System.Boolean;
	}
}
