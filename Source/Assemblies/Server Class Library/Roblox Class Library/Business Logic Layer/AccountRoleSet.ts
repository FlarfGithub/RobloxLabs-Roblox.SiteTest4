import { CacheabilitySettings } from '../../../Caching/Roblox.Caching/CacheabilitySettings';
import { CacheInfo } from '../../../Caching/Roblox.Caching/CacheInfo';
import { CacheManager } from '../../../Caching/Roblox.Caching/CacheManager';
import { IRobloxEntity } from '../../../Data/Interfaces/Roblox.Data.Interfaces/IRobloxEntity';
import { EntityHelper } from '../../../Data/Roblox.Data/Entities/EntityHelper';
import { AccountRoleSetDAL } from '../Data Logic Layer/AccountRoleSetDAL';
import { IAccountRoleSet } from '../Types And Interfaces/IAccountRoleSet';

export class AccountRoleSet implements IRobloxEntity<number, AccountRoleSetDAL>, IAccountRoleSet {
	private _EntityDAL: AccountRoleSetDAL;

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

	public constructor() {
		this._EntityDAL = new AccountRoleSetDAL();
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

	public static Get(id: int): AccountRoleSet {
		return EntityHelper.GetEntity<int, AccountRoleSetDAL, AccountRoleSet>(AccountRoleSet.EntityCacheInfo, id, () =>
			AccountRoleSetDAL.Get(id),
		);
	}

	public static GetAccountRoleSetsByCreated(Created: DateTime): AccountRoleSet[] {
		const collectionId = `GetAccountRoleSetsByCreated_Created:${Created}`;
		return EntityHelper.GetEntityCollection<AccountRoleSet, int>(
			AccountRoleSet.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `Created:${Created}`),
			collectionId,
			() => AccountRoleSetDAL.GetAccountRoleSetIDsByCreated(Created),
			AccountRoleSet.Get,
		);
	}

	public static GetAccountRoleSetsByUpdated(Updated: DateTime): AccountRoleSet[] {
		const collectionId = `GetAccountRoleSetsByUpdated_Updated:${Updated}`;
		return EntityHelper.GetEntityCollection<AccountRoleSet, int>(
			AccountRoleSet.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `Updated:${Updated}`),
			collectionId,
			() => AccountRoleSetDAL.GetAccountRoleSetIDsByUpdated(Updated),
			AccountRoleSet.Get,
		);
	}

	public static GetAccountRoleSetsByName(Name: string): AccountRoleSet[] {
		const collectionId = `GetAccountRoleSetsByName_Name:${Name}`;
		return EntityHelper.GetEntityCollection<AccountRoleSet, int>(
			AccountRoleSet.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `Name:${Name}`),
			collectionId,
			() => AccountRoleSetDAL.GetAccountRoleSetIDsByName(Name),
			AccountRoleSet.Get,
		);
	}

	public static GetAllAccountRoleSets(): AccountRoleSet[] {
		const collectionId = `GetAllAccountRoleSets`;
		return EntityHelper.GetEntityCollection<AccountRoleSet, int>(
			AccountRoleSet.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, ``),
			collectionId,
			() => AccountRoleSetDAL.GetAccountRoleSetIDs(),
			AccountRoleSet.Get,
		);
	}

	public Construct(dal: AccountRoleSetDAL) {
		this._EntityDAL = dal;
	}

	public get CacheInfo() {
		return AccountRoleSet.EntityCacheInfo;
	}

	public static EntityCacheInfo: CacheInfo = new CacheInfo(
		new CacheabilitySettings(true, true, true, true, true, true, true),
		typeof AccountRoleSet.toString(),
	);

	public *BuildEntityIDLookups(): Generator<any, string[], any> {
		return yield [];
	}
}
