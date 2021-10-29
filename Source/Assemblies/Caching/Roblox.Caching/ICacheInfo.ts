import { CacheabilitySettings } from './CacheabilitySettings';

export interface ICacheInfo {
	readonly Cacheability: CacheabilitySettings;
	readonly EntityType: System.String;
}
