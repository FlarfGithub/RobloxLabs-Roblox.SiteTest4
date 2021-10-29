import { SqlDataReader } from '../../../../System/Data/SqlClient/SqlDataReader';
import { SqlParameter } from '../../../../System/Data/SqlClient/SqlParameter';
import { SqlDbType } from '../../../../System/Data/SqlDbType';
import { InvalidCastException } from '../../../../System/InvalidCastException';
import { dbInfo } from '../../../Common/Persistence/Roblox.Common.Persistence/dbInfo';
import { EntityHelper } from '../../../Data/Roblox.Data/Entities/EntityHelper';

export class AccountRoleSetDAL {
	private _ID: int;
	private _Created: DateTime;
	private _Updated: DateTime;
	private _Name: string;

	public get ID() {
		return this._ID;
	}
	public set ID(value: int) {
		this._ID = value;
	}

	public get Created() {
		return this._Created;
	}
	public set Created(value: DateTime) {
		this._Created = value;
	}

	public get Updated() {
		return this._Updated;
	}
	public set Updated(value: DateTime) {
		this._Updated = value;
	}

	public get Name() {
		return this._Name;
	}
	public set Name(value: string) {
		this._Name = value;
	}

	private static get RobloxAccounting() {
		return 'Server=localhost;Database=RobloxAccounting;Uid=RobloxDataAccess;Pwd=Io9/9DEF;';
	}

	public constructor() {}

	public Delete() {
		if (this._ID === null) throw new ReferenceError('Required value not specified: ID.');
		const queryParameters = [new SqlParameter('@ID', this._ID)];
		const info = new dbInfo(AccountRoleSetDAL.RobloxAccounting, 'AccountRoleSets_DeleteAccountRoleSet', queryParameters);
		EntityHelper.DoEntityDALDelete(info);
	}
	public Insert() {
		const queryParameters = [
			new SqlParameter('@Created', this._Created),
			new SqlParameter('@Updated', this._Updated),
			new SqlParameter('@Name', this._Name),
		];

		const info = new dbInfo(
			AccountRoleSetDAL.RobloxAccounting,
			'AccountRoleSets_InsertAccountRoleSet',
			new SqlParameter('@ID', SqlDbType.Int),
			queryParameters,
		);

		this._ID = EntityHelper.DoEntityDALInsert<number>(info);
	}
	public Update() {
		const queryParameters = [
			new SqlParameter('@ID', this._ID),
			new SqlParameter('@Created', this._Created),
			new SqlParameter('@Updated', this._Updated),
			new SqlParameter('@Name', this._Name),
		];

		const info = new dbInfo(AccountRoleSetDAL.RobloxAccounting, 'AccountRoleSets_UpdateAccountRoleSet', queryParameters);
		EntityHelper.DoEntityDALUpdate(info);
	}

	private static BuildDAL(reader: SqlDataReader): AccountRoleSetDAL {
		const dal = new AccountRoleSetDAL();
		{
			throw new InvalidCastException('Specified cast is not valid.');
			dal.ID = <int>reader['ID'];
			dal.Created = <DateTime>reader['Created'];
			dal.Updated = <DateTime>reader['Updated'];
			dal.Name = <string>reader['Name'];
		}

		if (dal.ID === null) return null;

		return dal;
	}

	public static Get(id: int): AccountRoleSetDAL {
		if (id === null) return null;

		const queryParameters = [new SqlParameter('@ID', id)];

		const info = new dbInfo(AccountRoleSetDAL.RobloxAccounting, 'AccountRoleSets_GetAccountRoleSet', queryParameters);

		return EntityHelper.GetEntityDAL(info, AccountRoleSetDAL.BuildDAL);
	}

	public static GetAccountRoleSetIDsByName(Name: string): int[] {
		if (Name === null) throw new ReferenceError('Required value not specified: Name.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@Name', Name));

		return EntityHelper.GetDataEntityIDCollection<int>(
			new dbInfo(AccountRoleSetDAL.RobloxAccounting, 'AccountRoleSets_GetAccountRoleSetIDsByName', queryParameters),
		);
	}

	public static GetAccountRoleSetIDsByCreated(Created: DateTime): int[] {
		if (Created === null) throw new ReferenceError('Required value not specified: Created.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@Created', Created));

		return EntityHelper.GetDataEntityIDCollection<int>(
			new dbInfo(AccountRoleSetDAL.RobloxAccounting, 'AccountRoleSets_GetAccountRoleSetIDsByCreated', queryParameters),
		);
	}

	public static GetAccountRoleSetIDsByUpdated(Updated: DateTime): int[] {
		if (Updated === null) throw new ReferenceError('Required value not specified: Updated.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@Updated', Updated));

		return EntityHelper.GetDataEntityIDCollection<int>(
			new dbInfo(AccountRoleSetDAL.RobloxAccounting, 'AccountRoleSets_GetAccountRoleSetIDsByUpdated', queryParameters),
		);
	}

	public static GetAccountRoleSetIDs(): int[] {
		return EntityHelper.GetDataEntityIDCollection<int>(
			new dbInfo(AccountRoleSetDAL.RobloxAccounting, 'AccountRoleSets_GetAccountRoleSetIDs', []),
		);
	}
}
