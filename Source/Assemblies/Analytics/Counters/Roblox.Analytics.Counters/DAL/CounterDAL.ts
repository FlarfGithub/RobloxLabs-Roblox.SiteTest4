import { SqlDataReader } from '../../../../../System/Data/SqlClient/SqlDataReader';
import { SqlParameter } from '../../../../../System/Data/SqlClient/SqlParameter';
import { SqlDbType } from '../../../../../System/Data/SqlDbType';
import { dbInfo } from '../../../../Common/Persistence/Roblox.Common.Persistence/dbInfo';
import { EntityHelper } from '../../../../Data/Roblox.Data/Entities/EntityHelper';

export class CounterDAL {
	private _ID: number;
	private _Created: Date;
	private _Updated: Date;
	private _Name: string;
	private _Value: number;

	public get ID() {
		return this._ID;
	}
	public set ID(value: number) {
		this._ID = value;
	}

	public get Created() {
		return this._Created;
	}
	public set Created(value: Date) {
		this._Created = value;
	}

	public get Updated() {
		return this._Updated;
	}
	public set Updated(value: Date) {
		this._Updated = value;
	}

	public get Name() {
		return this._Name;
	}
	public set Name(value: string) {
		this._Name = value;
	}

	public get Value() {
		return this._Value;
	}
	public set Value(value: number) {
		this._Value = value;
	}

	private static get RobloxAnalytics() {
		return 'Server=localhost;Database=RobloxAnalytics;Uid=RobloxDataAccess;Pwd=Io9/9DEF;';
	}

	public constructor() {}

	public Delete() {
		if (this._ID === null) throw new ReferenceError('Required value not specified: ID.');
		const queryParameters = [new SqlParameter('@ID', this._ID)];
		const info = new dbInfo(CounterDAL.RobloxAnalytics, 'DeleteCounter', queryParameters);
		EntityHelper.DoEntityDALDelete(info);
	}
	public Insert() {
		const queryParameters = [
			new SqlParameter('@Created', this._Created),
			new SqlParameter('@Updated', this._Updated),
			new SqlParameter('@Name', this._Name),
			new SqlParameter('@Value', this._Value),
		];

		const info = new dbInfo(CounterDAL.RobloxAnalytics, 'InsertCounter', new SqlParameter('@Id', SqlDbType.Int), queryParameters);

		this._ID = EntityHelper.DoEntityDALInsert<number>(info);
	}
	public Update() {
		const queryParameters = [
			new SqlParameter('@Id', this._ID),
			new SqlParameter('@Created', this._Created),
			new SqlParameter('@Updated', this._Updated),
			new SqlParameter('@Name', this._Name),
			new SqlParameter('@Value', this._Value),
		];

		const info = new dbInfo(CounterDAL.RobloxAnalytics, 'UpdateCounter', queryParameters);
		EntityHelper.DoEntityDALUpdate(info);
	}

	private static BuildDAL(reader: SqlDataReader): CounterDAL {
		const dal = new CounterDAL();
		{
			dal.ID = <number>reader['ID'];
			dal.Created = <Date>reader['Created'];
			dal.Updated = <Date>reader['Updated'];
			dal.Name = <string>reader['Name'];
			dal.Value = <number>reader['Value'];
		}

		if (dal.ID === null) return null;

		return dal;
	}

	public static Get(id: number): CounterDAL {
		if (id === null) return null;

		const queryParameters = [new SqlParameter('@ID', id)];

		const info = new dbInfo(this.RobloxAnalytics, 'GetCounter', queryParameters);

		return EntityHelper.GetEntityDAL(info, this.BuildDAL);
	}

	public static GetCounterIDsByName(Name: string): number[] {
		if (Name === null) throw new ReferenceError('Required value not specified: Name.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@Name', Name));

		return EntityHelper.GetDataEntityIDCollection<number>(
			new dbInfo(this.RobloxAnalytics, 'Counters_GetCounterIDsByName', queryParameters),
		);
	}

	public static GetCounterIDsByCreated(Created: Date): number[] {
		if (Created === null) throw new ReferenceError('Required value not specified: Created.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@Created', Created));

		return EntityHelper.GetDataEntityIDCollection<number>(
			new dbInfo(this.RobloxAnalytics, 'Counters_GetCounterIDsByCreated', queryParameters),
		);
	}

	public static GetCounterIDsByUpdated(Updated: Date): number[] {
		if (Updated === null) throw new ReferenceError('Required value not specified: Updated.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@Updated', Updated));

		return EntityHelper.GetDataEntityIDCollection<number>(
			new dbInfo(this.RobloxAnalytics, 'Counters_GetCounterIDsByUpdated', queryParameters),
		);
	}

	public static GetCounterIDsByValue(Value: number): number[] {
		if (Value === null) throw new ReferenceError('Required value not specified: Value.');
		const queryParameters: SqlParameter[] = [];

		queryParameters.push(new SqlParameter('@Value', Value));

		return EntityHelper.GetDataEntityIDCollection<number>(
			new dbInfo(this.RobloxAnalytics, 'Counters_GetCounterIDsByValue', queryParameters),
		);
	}

	public static GetCounterIDs(): number[] {
		return EntityHelper.GetDataEntityIDCollection<number>(new dbInfo(this.RobloxAnalytics, 'Counters_GetCounterIDs', []));
	}
}
