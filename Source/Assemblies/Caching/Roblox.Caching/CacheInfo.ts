import { CacheabilitySettings } from './CacheabilitySettings';
import { ICacheInfo } from './ICacheInfo';

export class CacheInfo implements ICacheInfo {
	private _Cacheability: CacheabilitySettings = null;
	private _EntityType: string = null;

	public get Cacheability() {
		return this._Cacheability;
	}

	public get EntityType() {
		return this._EntityType;
	}

	public constructor(cacheability: CacheabilitySettings, entityType: string) {
		this._Cacheability = cacheability;
		this._EntityType = entityType;
	}
}
