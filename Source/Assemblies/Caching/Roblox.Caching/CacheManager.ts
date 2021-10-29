export namespace CacheManager {
	export class CachePolicy {
		public constructor(scopeFilter: CacheScopeFilter, cacheKey: string) {}
	}
	export enum CacheScopeFilter {
		Qualified,
	}
}
