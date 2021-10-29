import { ICacheabilitySettings } from './ICacheabilitySettings';

export class CacheabilitySettings implements ICacheabilitySettings {
	private _CollectionsAreCacheable: boolean = false;
	private _CountsAreCacheable: boolean = false;
	private _EntityIsCacheable: boolean = false;
	private _IDLookupsAreCacheable: boolean = false;
	private _IsNullCacheable: boolean = false;
	private _HasUnqualifiedCollections: boolean = false;
	private _IDLookupsAreCaseSensitive: boolean = false;

	public get CollectionsAreCacheable() {
		return this._CollectionsAreCacheable;
	}

	public get CountsAreCacheable() {
		return this._CountsAreCacheable;
	}

	public get EntityIsCacheable() {
		return this._EntityIsCacheable;
	}

	public get IDLookupsAreCacheable() {
		return this._IDLookupsAreCacheable;
	}

	public get IsNullCacheable() {
		return this._IsNullCacheable;
	}

	public get HasUnqualifiedCollections() {
		return this._HasUnqualifiedCollections;
	}

	public get IDLookupsAreCaseSensitive() {
		return this._IDLookupsAreCaseSensitive;
	}

	public constructor(
		collectionsAreCacheable: boolean = false,
		countsAreCacheable: boolean = false,
		entityIsCacheable: boolean = false,
		idLookupsAreCacheable: boolean = false,
		isNullCacheable: boolean = false,
		hasUnqualifiedCollections: boolean = false,
		idLookupsAreCaseSensitive: boolean = false,
	) {
		this._CollectionsAreCacheable = collectionsAreCacheable;
		this._CountsAreCacheable = countsAreCacheable;
		this._EntityIsCacheable = entityIsCacheable;
		this._IDLookupsAreCacheable = idLookupsAreCacheable;
		this._IsNullCacheable = isNullCacheable;
		this._HasUnqualifiedCollections = hasUnqualifiedCollections;
		this._IDLookupsAreCaseSensitive = idLookupsAreCaseSensitive;
	}
}
