/// <reference path="./ICounter.ts" />

import { CacheabilitySettings } from '../../../Caching/Roblox.Caching/CacheabilitySettings';
import { CacheInfo } from '../../../Caching/Roblox.Caching/CacheInfo';
import { CacheManager } from '../../../Caching/Roblox.Caching/CacheManager';
import { IRobloxEntity } from '../../../Data/Interfaces/Roblox.Data.Interfaces/IRobloxEntity';
import { EntityHelper } from '../../../Data/Roblox.Data/Entities/EntityHelper';
import { CounterDAL } from './DAL/CounterDAL';
import { ICounter } from './ICounter';

export class Counter implements IRobloxEntity<number, CounterDAL>, ICounter {
	private _EntityDAL: CounterDAL;

	public get ID() {
		return this._EntityDAL.ID;
	}

	public get Created() {
		return this._EntityDAL.Created;
	}

	public get Updated() {
		return this._EntityDAL.Updated;
	}

	public get Name() {
		return this._EntityDAL.Name;
	}

	public set Name(value: string) {
		this._EntityDAL.Name = value;
	}

	public get Value() {
		return this._EntityDAL.Value;
	}

	public set Value(value: number) {
		this._EntityDAL.Value = value;
	}

	public constructor() {
		this._EntityDAL = new CounterDAL();
	}

	public Delete() {
		EntityHelper.DeleteEntity(this, this._EntityDAL.Delete);
	}

	public Save() {
		EntityHelper.SaveEntity(
			this,
			() => {
				this._EntityDAL.Created = new Date(Date.now());
				this._EntityDAL.Updated = this._EntityDAL.Created;
				this._EntityDAL.Insert();
			},
			() => {
				this._EntityDAL.Updated = new Date(Date.now());
				this._EntityDAL.Update();
			},
		);
	}

	public static Get(id: number): Counter {
		return EntityHelper.GetEntity<number, CounterDAL, Counter>(this.EntityCacheInfo, id, () => CounterDAL.Get(id));
	}

	public static GetCountersByCreated(Created: Date): Counter[] {
		const collectionId = `GetCountersByCreated_Created:${Created}`;
		return EntityHelper.GetEntityCollection<Counter, number>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `Created:${Created}`),
			collectionId,
			() => CounterDAL.GetCounterIDsByCreated(Created),
			Counter.Get,
		);
	}

	public static GetCountersByUpdated(Updated: Date): Counter[] {
		const collectionId = `GetCountersByUpdated_Updated:${Updated}`;
		return EntityHelper.GetEntityCollection<Counter, number>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `Updated:${Updated}`),
			collectionId,
			() => CounterDAL.GetCounterIDsByUpdated(Updated),
			Counter.Get,
		);
	}

	public static GetCountersByName(Name: string): Counter[] {
		const collectionId = `GetCountersByName_Name:${Name}`;
		return EntityHelper.GetEntityCollection<Counter, number>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `Name:${Name}`),
			collectionId,
			() => CounterDAL.GetCounterIDsByName(Name),
			Counter.Get,
		);
	}

	public static GetCountersByValue(Value: number): Counter[] {
		const collectionId = `GetCountersByValue_Value:${Value}`;
		return EntityHelper.GetEntityCollection<Counter, number>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `Value:${Value}`),
			collectionId,
			() => CounterDAL.GetCounterIDsByValue(Value),
			Counter.Get,
		);
	}

	public static GetAllCounters(): Counter[] {
		const collectionId = `GetAllCounters`;
		return EntityHelper.GetEntityCollection<Counter, number>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, ``),
			collectionId,
			() => CounterDAL.GetCounterIDs(),
			Counter.Get,
		);
	}

	public Construct(dal: CounterDAL) {
		this._EntityDAL = dal;
	}

	public get CacheInfo() {
		return Counter.EntityCacheInfo;
	}

	public static EntityCacheInfo: CacheInfo = new CacheInfo(
		new CacheabilitySettings(true, true, true, true, true, true, true),
		typeof Counter.toString(),
	);

	public *BuildEntityIDLookups(): Generator<any, string[], any> {
		return yield [];
	}
}
