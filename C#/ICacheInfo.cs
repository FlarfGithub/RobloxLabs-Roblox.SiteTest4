using System;

namespace Roblox.Caching {
	public interface ICacheInfo {
		CacheabilitySettings Cacheability { get; }
		string EntityType { get; }
	}
}