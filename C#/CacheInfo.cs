using System;

namespace Roblox.Caching {
	public class CacheInfo : ICacheInfo {
		private	CacheabilitySettings _Cacheability = default(CacheabilitySettings);
		private string _EntityType = default(string);

		public CacheabilitySettings Cacheability {
			get { return _Cacheability; }
		}

		public string EntityType {
			get { return _EntityType; }
		}

		public CacheInfo(CacheabilitySettings cacheability, string entityType) {
			_Cacheability = cacheability;
			_EntityType = entityType;
		}
	}
}