import { SqlDataReader } from '../../../../System/Data/SqlClient/SqlDataReader';
import { SqlParameter } from '../../../../System/Data/SqlClient/SqlParameter';
import { SqlDbType } from '../../../../System/Data/SqlDbType';
import { dbInfo } from '../../../Common/Persistence/Roblox.Common.Persistence/dbInfo';
import { EntityHelper } from '../../../Data/Roblox.Data/Entities/EntityHelper';
import { IAccountRoleSet } from '../Types And Interfaces/IAccountRoleSet';

export class AccountDAL {
	private _ID: long;
	private _Created: DateTime;
	private _Updated: DateTime;
	private _EmailAddress: string;
	private _PhoneNumber: string;
	private _AccountRoleSets: IAccountRoleSet[];

	public get ID() {
		return this._ID;
	}
	public set ID(value: long) {
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

	public get EmailAddress() {
		return this._EmailAddress;
	}
	public set EmailAddress(value: string) {
		this._EmailAddress = value;
	}

	public get PhoneNumber() {
		return this._PhoneNumber;
	}
	public set PhoneNumber(value: string) {
		this._PhoneNumber = value;
	}

	public get AccountRoleSets() {
		return this._AccountRoleSets;
	}
	public set AccountRoleSets(value: IAccountRoleSet[]) {
		this._AccountRoleSets = value;
	}

	private static get RobloxAccounting() {
		return 'Server=localhost;Database=RobloxAccounting;Uid=RobloxDataAccess;Pwd=Io9/9DEF;';
	}

	public constructor() {}

	public Delete() {
		if (this._ID === null) throw new ReferenceError('Required value not specified: ID.');
		const queryParameters = [new SqlParameter('@ID', this._ID)];
		const info = new dbInfo(AccountDAL.RobloxAccounting, 'Accounts_DeleteAccount', queryParameters);
		EntityHelper.DoEntityDALDelete(info);
	}
	public Insert() {
		const queryParameters = [
			new SqlParameter('@Created', this._Created),
			new SqlParameter('@Updated', this._Updated),
			new SqlParameter('@EmailAddress', this._EmailAddress),
			new SqlParameter('@PhoneNumber', this._PhoneNumber),
			new SqlParameter('@AccountRoleSets', this._AccountRoleSets),
		];

		const info = new dbInfo(
			AccountDAL.RobloxAccounting,
			'Accounts_InsertAccount',
			new SqlParameter('@ID', SqlDbType.BigInt),
			queryParameters,
		);

		this._ID = EntityHelper.DoEntityDALInsert<number>(info);
	}
	public Update() {
		const queryParameters = [
			new SqlParameter('@ID', this._ID),
			new SqlParameter('@Created', this._Created),
			new SqlParameter('@Updated', this._Updated),
			new SqlParameter('@EmailAddress', this._EmailAddress),
			new SqlParameter('@PhoneNumber', this._PhoneNumber),
			new SqlParameter('@AccountRoleSets', this._AccountRoleSets),
		];

		const info = new dbInfo(AccountDAL.RobloxAccounting, 'Accounts_UpdateAccount', queryParameters);
		EntityHelper.DoEntityDALUpdate(info);
	}

	private static BuildDAL(reader: SqlDataReader): AccountDAL {
		const dal = new AccountDAL();
		{
			dal.ID = <long>reader['ID'];
			dal.Created = <DateTime>reader['Created'];
			dal.Updated = <DateTime>reader['Updated'];
			dal.EmailAddress = <string>reader['EmailAddress'];
			dal.PhoneNumber = <string>reader['PhoneNumber'];
			dal.AccountRoleSets = <IAccountRoleSet[]>reader['AccountRoleSets'];
		}

		if (dal.ID === null) return null;

		return dal;
	}

	public static Get(id: long): AccountDAL {
		if (id === null) return null;

		const queryParameters = [new SqlParameter('@ID', id)];

		const info = new dbInfo(this.RobloxAccounting, 'Accounts_GetAccount', queryParameters);

		return EntityHelper.GetEntityDAL(info, this.BuildDAL);
	}

	public static GetAccountIDsByCreated(Created: DateTime): long[] {
		if (Created === null) throw new ReferenceError('Required value not specified: Created.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@Created', Created));

		return EntityHelper.GetDataEntityIDCollection<long>(
			new dbInfo(this.RobloxAccounting, 'Accounts_GetAccountIDsByCreated', queryParameters),
		);
	}

	public static GetAccountIDsByUpdated(Updated: DateTime): long[] {
		if (Updated === null) throw new ReferenceError('Required value not specified: Updated.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@Updated', Updated));

		return EntityHelper.GetDataEntityIDCollection<long>(
			new dbInfo(this.RobloxAccounting, 'Accounts_GetAccountIDsByUpdated', queryParameters),
		);
	}

	public static GetAccountIDsByEmailAddress(EmailAddress: string): long[] {
		if (EmailAddress === null) throw new ReferenceError('Required value not specified: EmailAddress.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@EmailAddress', EmailAddress));

		return EntityHelper.GetDataEntityIDCollection<long>(
			new dbInfo(this.RobloxAccounting, 'Accounts_GetAccountIDsByEmailAddress', queryParameters),
		);
	}

	public static GetAccountIDsByPhoneNumber(PhoneNumber: string): long[] {
		if (PhoneNumber === null) throw new ReferenceError('Required value not specified: PhoneNumber.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@PhoneNumber', PhoneNumber));

		return EntityHelper.GetDataEntityIDCollection<long>(
			new dbInfo(this.RobloxAccounting, 'Accounts_GetAccountIDsByPhoneNumber', queryParameters),
		);
	}

	public static GetAccountIDsByAccountRoleSets(AccountRoleSets: IAccountRoleSet[]): long[] {
		if (AccountRoleSets === null) throw new ReferenceError('Required value not specified: AccountRoleSets.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@AccountRoleSets', AccountRoleSets));

		return EntityHelper.GetDataEntityIDCollection<long>(
			new dbInfo(this.RobloxAccounting, 'Accounts_GetAccountIDsByAccountRoleSets', queryParameters),
		);
	}

	public static GetAccountIDs(): long[] {
		return EntityHelper.GetDataEntityIDCollection<long>(new dbInfo(this.RobloxAccounting, 'Accounts_GetAccountIDs', []));
	}
}
