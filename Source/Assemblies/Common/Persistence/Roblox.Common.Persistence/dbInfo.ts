import { ArgumentNullException } from '../../../../System/ArgumentNullException';
import { SqlParameter } from '../../../../System/Data/SqlClient/SqlParameter';

export class dbInfo {
	private _ConnectionString: string;
	private _StoredProcedure: string;
	private _OutputKey: SqlParameter;
	private _QueryParameters: SqlParameter[];

	public get ConnectionString() {
		return this._ConnectionString;
	}

	public get StoredProcedure() {
		return this._StoredProcedure;
	}

	public get OutputKey() {
		return this._OutputKey;
	}

	public get QueryParameters() {
		return this._QueryParameters;
	}

	public constructor(connectionString: string, storedProcedure: string);
	public constructor(connectionString: string, storedProcedure: string, queryParameters: SqlParameter[]);
	public constructor(connectionString: string, storedProcedure: string, outputKey: SqlParameter, queryParameters: SqlParameter[]);

	public constructor(
		connectionString: string,
		storedProcedure: string,
		outputKey?: SqlParameter | SqlParameter[],
		queryParameters?: SqlParameter[],
	) {
		if (connectionString === null) throw new ArgumentNullException('connectionString');
		if (storedProcedure === null) throw new ArgumentNullException('storedProcedure');
		this._ConnectionString = connectionString;
		this._StoredProcedure = storedProcedure;
		queryParameters !== null && Array.isArray(outputKey) && queryParameters !== null
			? (this._OutputKey = null)
			: (this._OutputKey = <SqlParameter>outputKey);
		this._OutputKey === null && !(outputKey === null && queryParameters === null)
			? (this._QueryParameters = <SqlParameter[]>outputKey)
			: (this._QueryParameters = queryParameters);
	}
}
