using System;

namespace Roblox.Caching {
	public class CacheabilitySettings : ICacheabilitySettings {
		private bool _CollectionsAreCacheable = default(bool);
		private bool _CountsAreCacheable = default(bool);
		private bool _EntityIsCacheable = default(bool);
		private bool _IDLookupsAreCacheable = default(bool);
		private bool _IsNullCacheable = default(bool);
		private bool _HasUnqualifiedCollections = default(bool);
		private bool _IDLookupsAreCaseSensitive = default(bool);

		internal bool CollectionsAreCacheable {
			get { return _CollectionsAreCacheable; }
		}

		internal bool CountsAreCacheable {
			get { return _CountsAreCacheable; }
		}

		internal bool EntityIsCacheable {
			get { return _EntityIsCacheable; }
		}

		internal bool IDLookupsAreCacheable {
			get { return _IDLookupsAreCacheable; }
		}

		internal bool IsNullCacheable {
			get { return _IsNullCacheable; }
		}
		
		internal bool HasUnqualifiedCollections {
			get { return _HasUnqualifiedCollections; }
		}

		internal bool IDLookupsAreCaseSensitive {
			get { return _IDLookupsAreCaseSensitive; }
		}

		public CacheabilitySettings(bool collectionsAreCacheable = false, bool countsAreCacheable = false, bool entityIsCacheable = false, bool idLookupsAreCacheable = false, bool isNullCacheable = false, bool hasUnqualifiedCollections = false, bool idLookupsAreCaseSensitive = false) {
			_CollectionsAreCacheable = collectionsAreCacheable;
			_CountsAreCacheable = countsAreCacheable;
			_EntityIsCacheable = entityIsCacheable;
			_IDLookupsAreCacheable = idLookupsAreCacheable;
			_IsNullCacheable = isNullCacheable
			_HasUnqualifiedCollections = hasUnqualifiedCollections;
			_IDLookupsAreCaseSensitive = idLookupsAreCaseSensitive;
		}
	}
}