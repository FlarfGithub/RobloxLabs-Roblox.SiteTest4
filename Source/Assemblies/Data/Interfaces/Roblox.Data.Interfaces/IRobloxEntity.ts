import { CacheInfo } from '../../../Caching/Roblox.Caching/CacheInfo';

export interface IRobloxEntity<TIDType, TEntityDAL> {
	ID: TIDType;

	Delete(): void;

	Save(): void;

	Construct(dal: TEntityDAL): void;

	CacheInfo: CacheInfo;

	BuildEntityIDLookups(): Generator<any, string[], any>;

	/* BuildStateTokenCollection(): StateToken[]; */
}
