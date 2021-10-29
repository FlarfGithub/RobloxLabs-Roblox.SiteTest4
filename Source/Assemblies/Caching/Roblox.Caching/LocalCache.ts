import { IDisposable } from '../../../System/IDisposable';
import { EntityHelper } from '../../Data/Roblox.Data/Entities/EntityHelper';
import { CacheInfo } from './CacheInfo';
import { ItemFetcher } from './ItemFetcher';

export class LocalCache implements IDisposable {
	Dispose(): void {
		throw new Error('Method not implemented.');
	}
	public static GetEntityFromCache<TIndex, TEntity>(cacheInfo: CacheInfo, entityId: TIndex, getter: () => any): TEntity {
		this.FillItemFetcher(getter, new ItemFetcher());
		return;
	}

	public static FillItemFetcher<TIndex, TEntity>(getter: () => any, itemFetcher: ItemFetcher) {
		const id: TIndex = <TIndex>(<unknown>1);
		EntityHelper.DoGet(getter, id);
	}
}
