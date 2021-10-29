import { CacheabilitySettings } from '../../../Caching/Roblox.Caching/CacheabilitySettings';
import { CacheInfo } from '../../../Caching/Roblox.Caching/CacheInfo';
import { CacheManager } from '../../../Caching/Roblox.Caching/CacheManager';
import { RefreshAhead } from '../../../Common/Roblox.Common/RefreshAhead';
import { IRobloxEntity } from '../../../Data/Interfaces/Roblox.Data.Interfaces/IRobloxEntity';
import { EntityHelper } from '../../../Data/Roblox.Data/Entities/EntityHelper';
import { AccountDAL } from '../Data Logic Layer/AccountDAL';
import { IAccount } from '../Types And Interfaces/IAccount';
import { IAccountRoleSet } from '../Types And Interfaces/IAccountRoleSet';
import { AccountRoleSet } from './AccountRoleSet';

export class Account implements IRobloxEntity<number, AccountDAL>, IAccount {
	private _EntityDAL: AccountDAL;

	public get ID() {
		return this._EntityDAL.ID;
	}

	public get Created() {
		return this._EntityDAL.Created;
	}

	public get Updated() {
		return this._EntityDAL.Updated;
	}

	public get EmailAddress() {
		return this._EntityDAL.EmailAddress;
	}

	public set EmailAddress(value: string) {
		this._EntityDAL.EmailAddress = value;
	}

	public get PhoneNumber() {
		return this._EntityDAL.PhoneNumber;
	}

	public set PhoneNumber(value: string) {
		this._EntityDAL.PhoneNumber = value;
	}

	public get AccountRoleSets() {
		return this._EntityDAL.AccountRoleSets;
	}

	public set AccountRoleSets(value: IAccountRoleSet[]) {
		this._EntityDAL.AccountRoleSets = value;
	}

	public constructor() {
		this._EntityDAL = new AccountDAL();
		const refreshAhead = new RefreshAhead<AccountRoleSet>(new AccountRoleSet());
		refreshAhead.ConstructAndPopulate(1, AccountRoleSet.GetAllAccountRoleSets);
		this.AccountRoleSets = null;
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

	public static Get(id: long): Account {
		return EntityHelper.GetEntity<long, AccountDAL, Account>(this.EntityCacheInfo, id, () => AccountDAL.Get(id));
	}

	public static GetAccountsByCreated(Created: DateTime): Account[] {
		const collectionId = `GetAccountsByCreated_Created:${Created}`;
		return EntityHelper.GetEntityCollection<Account, long>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `Created:${Created}`),
			collectionId,
			() => AccountDAL.GetAccountIDsByCreated(Created),
			Account.Get,
		);
	}

	public static GetAccountsByUpdated(Updated: DateTime): Account[] {
		const collectionId = `GetAccountsByUpdated_Updated:${Updated}`;
		return EntityHelper.GetEntityCollection<Account, long>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `Updated:${Updated}`),
			collectionId,
			() => AccountDAL.GetAccountIDsByUpdated(Updated),
			Account.Get,
		);
	}

	public static GetAccountsByEmailAddress(EmailAddress: string): Account[] {
		const collectionId = `GetAccountsByEmailAddress_EmailAddress:${EmailAddress}`;
		return EntityHelper.GetEntityCollection<Account, long>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `EmailAddress:${EmailAddress}`),
			collectionId,
			() => AccountDAL.GetAccountIDsByEmailAddress(EmailAddress),
			Account.Get,
		);
	}

	public static GetAccountsByPhoneNumber(PhoneNumber: string): Account[] {
		const collectionId = `GetAccountsByPhoneNumber_PhoneNumber:${PhoneNumber}`;
		return EntityHelper.GetEntityCollection<Account, long>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `PhoneNumber:${PhoneNumber}`),
			collectionId,
			() => AccountDAL.GetAccountIDsByPhoneNumber(PhoneNumber),
			Account.Get,
		);
	}

	public static GetAccountsByAccountRoleSets(AccountRoleSets: IAccountRoleSet[]): Account[] {
		const collectionId = `GetAccountsByAccountRoleSets_AccountRoleSets:${AccountRoleSets}`;
		return EntityHelper.GetEntityCollection<Account, long>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, `AccountRoleSets:${AccountRoleSets}`),
			collectionId,
			() => AccountDAL.GetAccountIDsByAccountRoleSets(AccountRoleSets),
			Account.Get,
		);
	}

	public static GetAllAccounts(): Account[] {
		const collectionId = `GetAllAccounts`;
		return EntityHelper.GetEntityCollection<Account, long>(
			this.EntityCacheInfo,
			new CacheManager.CachePolicy(CacheManager.CacheScopeFilter.Qualified, ``),
			collectionId,
			() => AccountDAL.GetAccountIDs(),
			Account.Get,
		);
	}

	public Construct(dal: AccountDAL) {
		this._EntityDAL = dal;
	}

	public get CacheInfo() {
		return Account.EntityCacheInfo;
	}

	public static EntityCacheInfo: CacheInfo = new CacheInfo(
		new CacheabilitySettings(true, true, true, true, true, true, true),
		typeof Account.toString(),
	);

	public *BuildEntityIDLookups(): Generator<any, string[], any> {
		return yield [];
	}
}
