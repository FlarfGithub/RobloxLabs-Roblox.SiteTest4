import { SqlDataReader } from '../../../../System/Data/SqlClient/SqlDataReader';
import { CacheInfo } from '../../../Caching/Roblox.Caching/CacheInfo';
import { CacheManager } from '../../../Caching/Roblox.Caching/CacheManager';
import { ICacheInfo } from '../../../Caching/Roblox.Caching/ICacheInfo';
import { dbInfo } from '../../../Common/Persistence/Roblox.Common.Persistence/dbInfo';

export type BuildDAL<T> = (reader: SqlDataReader) => T;
export type GetIDCollection<TIndex> = () => TIndex[];
export type GetByID<TEntity, TIndex> = (id: TIndex) => TEntity;

export class EntityHelper {
	public static DoGet<TIndex, TDal, TEntity>(dalGetter: () => any, index: TIndex): TEntity {
		return;
	}
	public static DoEntityDALDelete(dbInfo: dbInfo) {}
	public static DoEntityDALUpdate(dbInfo: dbInfo) {}
	public static DoEntityDALInsert<TIndex>(dbInfo: dbInfo): TIndex {
		return;
	}
	public static GetEntityDAL<T>(dbInfo: dbInfo, dalBuilder: BuildDAL<T>): T {
		dalBuilder(new SqlDataReader());
		return;
	}
	public static GetDataEntityIDCollection<TResult>(dbInfo: dbInfo): TResult[] {
		return;
	}
	public static DeleteEntity<TEntity>(entity: TEntity, dalDeleter: () => void) {}
	public static SaveEntity<TEntity>(entity: TEntity, dalInserter: () => void, dalUpdater: () => void) {}
	public static GetEntity<TIndex, TEntityDAL, TEntity>(entityCacheInfo: ICacheInfo, id: TIndex, entityGetter: () => TEntityDAL): TEntity {
		return;
	}
	public static GetEntityCollection<TEntity, TIndex>(
		entityCacheInfo: CacheInfo,
		cachePolicy: CacheManager.CachePolicy,
		collectionId: string,
		idCollectionGetter: GetIDCollection<TIndex>,
		entityGetter: GetByID<TEntity, TIndex>,
	): TEntity[] {
		return;
	}
}
