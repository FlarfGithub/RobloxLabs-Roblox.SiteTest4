using System;

namespace Roblox.Caching {
	public interface ICacheabilitySettings {
		bool CollectionsAreCacheable { get; }
		bool CountsAreCacheable { get; }
		bool EntityIsCacheable { get; }
		bool IDLookupsAreCacheable { get; }
		bool IsNullCacheable { get; }
		bool HasUnqualifiedCollections { get; }
		bool IDLookupsAreCaseSensitive { get; }
	}
}