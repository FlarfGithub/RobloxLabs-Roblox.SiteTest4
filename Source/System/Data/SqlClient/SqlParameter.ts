// import { DBNull } from 'System/DBNull';
// import { NotImplementedException } from 'System/NotImplementedException';
// import { Type } from 'System/Type';
// import { ICloneable } from '../../ICloneable';
// import { DbParameter } from '../Common/DbParameter';
// import { DataRowVersion } from '../DataRowVersion';
// import { IDataParameter } from '../IDataParameter';
// import { IDbDataParameter } from '../IDbDataParameter';
// import { ParameterDirection } from '../ParameterDirection';
import { SqlDbType } from '../SqlDbType';
// import { INullable } from '../SqlTypes/INullable';
// import { SqlBinary } from '../SqlTypes/SqlBinary';
// import { MetaType } from './MetaType';
// import { SqlCipherMetadata } from './SqlCipherMetadata';
// import { SqlCollation } from './SqlCollation';

export class SqlParameter /*  extends DbParameter implements IDbDataParameter, IDataParameter, ICloneable */ {
	public constructor(parameterName: string, dbType: SqlDbType);

	public constructor(parameterName: string, value: any);

	public constructor(parameterName?: string, dbType?: SqlDbType, value?: any);

	public constructor(parameterName?: string, dbType?: SqlDbType, value?: any) {
		// super();
		this._parameterName = parameterName;
		this._dbType = dbType;
		this._value = value;
		this._isNull = value === null;
	}

	public static FromDbType(parameterName: string, dbType: SqlDbType) {
		const out = new SqlParameter(parameterName, dbType, undefined);
		return out;
	}

	public static FromValue(parameterName: string, value: any) {
		const out = new SqlParameter(parameterName, undefined, value);
		return out;
	}

	public get ParameterName() {
		return this._parameterName;
	}

	public get IsNull() {
		return this._isNull;
	}

	public get DbType() {
		return this._dbType;
	}

	public get Value() {
		return this._value;
	}

	private _parameterName: string;

	private _isNull: bool;

	private _dbType: SqlDbType;

	private _value: any;
}
