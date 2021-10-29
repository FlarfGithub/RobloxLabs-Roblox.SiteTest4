import { Connection } from 'mysql';
import { Task } from '../../../../System/Threading/Task';
import { IPartialDatabaseRowResponseModel } from '../Models/IPartialDatabaseRowResponseModel';
import { IPartialDatabaseCondition } from '../Models/IPartialDatabaseCondtion';
import { IPartialDatabaseRowsByKeyModel } from '../Models/IPartialDatabaseRowsByKeyModel';
import { IPartialDatabaseRowsByKeyValueModel } from '../Models/IPartialDatabaseRowsByKeyValueModel';
import { IPartialDatabaseSetValuesModel } from '../Models/IPartialDatabaseSetValuesModel';
import { PartialDatabaseConditionType } from '../Enumeration/PartialDatabaseConditionType';

export class PartialEntity<TEntity> {
	private connection_: Connection;
	private dbName_: string;
	private tableName_: string;
	private primaryKey_: string;
	private isAutoIncrementPK_: boolean;
	public constructor(
		dbName: string,
		tableName: string,
		primaryKey: string,
		primaryKeyIsAutoIncremented: boolean,
		connection: Connection,
	) {
		this.connection_ = connection;
		this.dbName_ = dbName;
		this.tableName_ = tableName.toLowerCase();
		this.primaryKey_ = primaryKey;
		this.isAutoIncrementPK_ = primaryKeyIsAutoIncremented;
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods for fetching from every row with out a condition
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Gets all rows from a table where the upstream key matches the given key.
	 * @param {TKey} key The key that is present inside the current enity.
	 * @param {number} limit An optional limit that is 100 by default
	 * @returns {Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async SelectKey<TKey extends keyof TEntity>(
		key: TKey,
		limit: number = 100,
	): Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]> {
		return new Promise<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>((resumeFunction) => {
			if (limit < 0) limit = 0;
			const query = `SELECT ${key} FROM \`${this.dbName_}\`.\`${this.tableName_}\` LIMIT ${limit};`;
			this.connection_.query(query, (err, results) => {
				if (err) return resumeFunction([false, err.message, null]);
				const rows: IPartialDatabaseRowsByKeyModel<TEntity, TKey, TEntity[TKey]>[] = [];
				results.forEach((entry: any) => {
					const entries: IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>[] = [];
					entries.push(<IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>>{
						Key: key,
						Value: entry[key],
						IsPrimary: key === this.primaryKey_,
					});
					rows.push({ Data: entries });
				});
				return resumeFunction([true, '', { Rows: rows }]);
			});
		});
	}

	/**
	 * Get's every row inside the table.
	 * @param {number} limit An optional limit that is 100 by default
	 * @returns {Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async SelectAll<TKey extends keyof TEntity>(
		limit: number = 100,
	): Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]> {
		return new Promise<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>((resumeFunction) => {
			if (limit < 0) limit = 0;
			const query = `SELECT * FROM \`${this.dbName_}\`.\`${this.tableName_}\` LIMIT ${limit};`;
			this.connection_.query(query, (err, results) => {
				if (err) return resumeFunction([false, err.message, null]);
				const rows: IPartialDatabaseRowsByKeyModel<TEntity, TKey, TEntity[TKey]>[] = [];
				results.forEach((entry: any) => {
					const keyMap = new Map<unknown, unknown>(Object.entries(entry));
					const entries: IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>[] = [];
					keyMap.forEach((v, k) => {
						entries.push(<IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>>{
							Key: k,
							Value: v,
							IsPrimary: k === this.primaryKey_,
						});
					});
					rows.push({ Data: entries });
				});
				return resumeFunction([true, '', { Rows: rows }]); // Do this for the time being so I can know what the response is.
			});
		});
	}

	/**
	 * Returns all of the rows filtering the keys inside of the TKey array.
	 * @param {TKey[]} keys The keys to filter by.
	 * @param {number} limit An optional limit that is 100 by default
	 * @returns {Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async SelectKeys<TKey extends keyof TEntity>(
		keys: TKey[],
		limit: number = 100,
	): Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]> {
		return new Promise<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>((resumeFunction) => {
			if (limit < 0) limit = 0;
			let query = `SELECT  `;
			keys.forEach((key, idx, arr) => {
				query += `${key}${idx !== arr.length - 1 ? ', ' : ''}`;
			});
			query += ` FROM \`${this.dbName_}\`.\`${this.tableName_}\` LIMIT ${limit};`;
			this.connection_.query(query, (err, results) => {
				if (err) return resumeFunction([false, err.message, null]);
				const rows: IPartialDatabaseRowsByKeyModel<TEntity, TKey, TEntity[TKey]>[] = [];
				results.forEach((entry: any) => {
					const keyMap = new Map<unknown, unknown>(Object.entries(entry));
					const entries: IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>[] = [];
					keyMap.forEach((v, k) => {
						entries.push(<IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>>{
							Key: k,
							Value: v,
							IsPrimary: k === this.primaryKey_,
						});
					});
					rows.push({ Data: entries });
				});
				return resumeFunction([true, '', { Rows: rows }]); // Do this for the time being so I can know what the response is.
			});
		});
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods for fetching from a row with a condition
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Gets the specified key from a row with a condition.
	 * @param {TKey} key The key to fetch.
	 * @param {IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>} condition The condition to follow.
	 * @returns {Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async SelectKeyWhere<TKey extends keyof TEntity>(
		key: TKey,
		condition: IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>,
	): Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]> {
		return new Promise<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>((resumeFunction) => {
			let conditionType = '=';
			switch (condition.Condition) {
				case PartialDatabaseConditionType.Equal:
					conditionType = '=';
					break;
				case PartialDatabaseConditionType.GreaterThan:
					conditionType = '>';
					break;
				case PartialDatabaseConditionType.LessThan:
					conditionType = '<';
					break;
				case PartialDatabaseConditionType.GreaterThanOrEqual:
					conditionType = '>=';
					break;
				case PartialDatabaseConditionType.LessThanOrEqual:
					conditionType = '<=';
					break;
				case PartialDatabaseConditionType.NotEqual:
					conditionType = '<>';
					break;
			}
			const query = `SELECT ${key} FROM \`${this.dbName_}\`.\`${this.tableName_}\` WHERE ${condition.Key} ${conditionType} '${condition.Value}';`;

			this.connection_.query(query, (err, results) => {
				if (err) return resumeFunction([false, err.message, null]);
				const rows: IPartialDatabaseRowsByKeyModel<TEntity, TKey, TEntity[TKey]>[] = [];
				results.forEach((entry: any) => {
					const entries: IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>[] = [];
					entries.push(<IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>>{
						Key: key,
						Value: entry[key],
						IsPrimary: key === this.primaryKey_,
					});
					rows.push({ Data: entries });
				});
				return resumeFunction([true, '', { Rows: rows }]);
			});
		});
	}

	/**
	 * Gets all the columns from a row where the condition matches.
	 * @param {IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>} condition The condition to follow.
	 * @returns {Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async SelectAllWhere<TKey extends keyof TEntity>(
		condition: IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>,
	): Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]> {
		return new Promise<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>((resumeFunction) => {
			let conditionType = '=';
			switch (condition.Condition) {
				case PartialDatabaseConditionType.Equal:
					conditionType = '=';
					break;
				case PartialDatabaseConditionType.GreaterThan:
					conditionType = '>';
					break;
				case PartialDatabaseConditionType.LessThan:
					conditionType = '<';
					break;
				case PartialDatabaseConditionType.GreaterThanOrEqual:
					conditionType = '>=';
					break;
				case PartialDatabaseConditionType.LessThanOrEqual:
					conditionType = '<=';
					break;
				case PartialDatabaseConditionType.NotEqual:
					conditionType = '<>';
					break;
			}
			const query = `SELECT * FROM \`${this.dbName_}\`.\`${this.tableName_}\` WHERE ${condition.Key} ${conditionType} '${condition.Value}';`;

			this.connection_.query(query, (err, results) => {
				if (err) return resumeFunction([false, err.message, null]);
				const rows: IPartialDatabaseRowsByKeyModel<TEntity, TKey, TEntity[TKey]>[] = [];
				results.forEach((entry: any) => {
					const keyMap = new Map<unknown, unknown>(Object.entries(entry));
					const entries: IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>[] = [];
					keyMap.forEach((v, k) => {
						entries.push(<IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>>{
							Key: k,
							Value: v,
							IsPrimary: k === this.primaryKey_,
						});
					});
					rows.push({ Data: entries });
				});
				return resumeFunction([true, '', { Rows: rows }]); // Do this for the time being so I can know what the response is.
			});
		});
	}

	/**
	 * Gets the columns specifed in TKey[] from the row that matches the condition.
	 * @param {TKey[]} keys The keys to fetch.
	 * @param {IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>} condition The condition to follow.
	 * @returns {Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async SelectKeysWhere<TKey extends keyof TEntity>(
		keys: TKey[],
		condition: IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>,
	): Task<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]> {
		return new Promise<[boolean, string, IPartialDatabaseRowResponseModel<TEntity, TKey, TEntity[TKey]>]>((resumeFunction) => {
			let conditionType = '=';
			switch (condition.Condition) {
				case PartialDatabaseConditionType.Equal:
					conditionType = '=';
					break;
				case PartialDatabaseConditionType.GreaterThan:
					conditionType = '>';
					break;
				case PartialDatabaseConditionType.LessThan:
					conditionType = '<';
					break;
				case PartialDatabaseConditionType.GreaterThanOrEqual:
					conditionType = '>=';
					break;
				case PartialDatabaseConditionType.LessThanOrEqual:
					conditionType = '<=';
					break;
				case PartialDatabaseConditionType.NotEqual:
					conditionType = '<>';
					break;
			}
			let query = `SELECT  `;
			keys.forEach((key, idx, arr) => {
				query += `${key}${idx !== arr.length - 1 ? ', ' : ''}`;
			});
			query += ` FROM \`${this.dbName_}\`.\`${this.tableName_}\` WHERE ${condition.Key} ${conditionType} '${condition.Value}';`;

			this.connection_.query(query, (err, results) => {
				if (err) return resumeFunction([false, err.message, null]);
				const rows: IPartialDatabaseRowsByKeyModel<TEntity, TKey, TEntity[TKey]>[] = [];
				results.forEach((entry: any) => {
					const keyMap = new Map<unknown, unknown>(Object.entries(entry));

					const entries: IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>[] = [];
					keyMap.forEach((v, k) => {
						entries.push(<IPartialDatabaseRowsByKeyValueModel<TEntity, TKey, TEntity[TKey]>>{
							Key: k,
							Value: v,
							IsPrimary: k === this.primaryKey_,
						});
					});
					rows.push({ Data: entries });
				});
				return resumeFunction([true, '', { Rows: rows }]); // Do this for the time being so I can know what the response is.
			});
		});
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods for fetching from a row with multiple conditions
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WIP

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods for updating entries inside of tables
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Updates the given key with the given value where the condition matches.
	 * @param {TKey} key The key to update.
	 * @param {TValue} value The value to update the key by.
	 * @param {IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>} condition The condition to follow.
	 * @returns {Task<[boolean, string]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async UpdateKey<TKey extends keyof TEntity, TValue extends TEntity[TKey]>(
		key: TKey,
		value: TValue,
		condition: IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>,
	): Task<[boolean, string]> {
		return new Promise<[boolean, string]>((resumeFunction) => {
			let conditionType = '=';
			switch (condition.Condition) {
				case PartialDatabaseConditionType.Equal:
					conditionType = '=';
					break;
				case PartialDatabaseConditionType.GreaterThan:
					conditionType = '>';
					break;
				case PartialDatabaseConditionType.LessThan:
					conditionType = '<';
					break;
				case PartialDatabaseConditionType.GreaterThanOrEqual:
					conditionType = '>=';
					break;
				case PartialDatabaseConditionType.LessThanOrEqual:
					conditionType = '<=';
					break;
				case PartialDatabaseConditionType.NotEqual:
					conditionType = '<>';
					break;
			}
			const query = `UPDATE \`${this.dbName_}\`.\`${this.tableName_}\` SET ${key} = '${value}' WHERE ${condition.Key} ${conditionType} '${condition.Value}';`;

			this.connection_.query(query, (err) => {
				if (err) return resumeFunction([false, err.message]);
				return resumeFunction([true, '']);
			});
		});
	}

	/**
	 * Updates the specified {Roblox.IPartialDataBaseSetValuesModel[]} keys where the {Roblox.IPartialDataBaseCondition} matches.
	 * @param {IPartialDatabaseSetValuesModel<TEntity, TKey, TEntity[TKey]>[]} keys The keys to update, in K and V fashion.
	 * @param {IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>} condition The condition to follow.
	 * @returns {Task<[boolean, string]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async UpdateKeys<TKey extends keyof TEntity>(
		keys: IPartialDatabaseSetValuesModel<TEntity, TKey, TEntity[TKey]>[],
		condition: IPartialDatabaseCondition<TEntity, TKey, TEntity[TKey]>,
	): Task<[boolean, string]> {
		return new Promise<[boolean, string]>((resumeFunction) => {
			let conditionType = '=';
			switch (condition.Condition) {
				case PartialDatabaseConditionType.Equal:
					conditionType = '=';
					break;
				case PartialDatabaseConditionType.GreaterThan:
					conditionType = '>';
					break;
				case PartialDatabaseConditionType.LessThan:
					conditionType = '<';
					break;
				case PartialDatabaseConditionType.GreaterThanOrEqual:
					conditionType = '>=';
					break;
				case PartialDatabaseConditionType.LessThanOrEqual:
					conditionType = '<=';
					break;
				case PartialDatabaseConditionType.NotEqual:
					conditionType = '<>';
					break;
			}
			let query = `UPDATE \`${this.dbName_}\`.\`${this.tableName_}\` SET `;
			keys.forEach((key, idx, arr) => {
				query += `${key.Key} = '${key.Value}'${idx !== arr.length - 1 ? ', ' : ''}`;
			});
			query += ` WHERE ${condition.Key} ${conditionType} '${condition.Value}';`;
			this.connection_.query(query, (err) => {
				if (err) return resumeFunction([false, err.message]);
				return resumeFunction([true, '']);
			});
		});
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods for updating entries inside of tables with multiple conditions
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WIP

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods for creating new entries inside of tables
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * This is useful for only inserting an entry with just the primary key. The only way to break this rule is if the PrimaryKey is an AutoIncremented key.
	 * @param {TKey} key This key MUST match the primaryKey of this entity. Unless this entity's PK is auto incremented, which you must specify in the {Roblox.PartialDataBase.GetTable()}
	 * @param {TEntity[TKey]} value The value of TKey
	 * @returns {Task<[boolean, string]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async InsertValue<TKey extends keyof TEntity>(key: TKey, value: TEntity[TKey]): Task<[boolean, string]> {
		return new Promise<[boolean, string]>((resumeFunction) => {
			let query = `INSERT INTO \`${this.dbName_}\`.\`${this.tableName_}\` (${key}) VALUES ('${value}');`;
			if (key !== this.primaryKey_ && !this.isAutoIncrementPK_)
				return resumeFunction([
					false,
					`The primary key '${this.primaryKey_} for the table ''${this.dbName_}'.'${this.tableName_}' was not present in the request.`,
				]);
			this.connection_.query(query, (err) => {
				if (err) return resumeFunction([false, err.message]);
				return resumeFunction([true, '']);
			});
		});
	}

	/**
	 * Use this for inserting multiple keys into an entry.
	 *
	 * ## THE PRIMARY KEY MUST BE INCLUDED HERE!
	 * The only way to break this rule is if the PrimaryKey is an AutoIncremented key.
	 * @param {IPartialDatabaseSetValuesModel<TEntity, TKey, TEntity[TKey]>[]} values A list of values based on the {Roblox.IPartialDataBaseSetValuesModel<TEntity, TKey extends keyof TEntity, TValue extends TEntity[TKey]>}
	 * @returns {Task<[boolean, string]>} Returns a Task that informs you whether or not the query succeeded.
	 */
	public async InsertValues<TKey extends keyof TEntity>(
		values: IPartialDatabaseSetValuesModel<TEntity, TKey, TEntity[TKey]>[],
	): Task<[boolean, string]> {
		return new Promise<[boolean, string]>((resumeFunction) => {
			let query = `INSERT INTO \`${this.dbName_}\`.\`${this.tableName_}\` `;
			if (!values) values = [];
			let qkeys = '(';
			let hasPrimaryKey = false;
			values.forEach((partialV, idx, arr) => {
				if (partialV.Key === <TKey>(<unknown>this.primaryKey_)) hasPrimaryKey = true;
				qkeys += `${partialV.Key}${idx !== arr.length - 1 ? ', ' : ''}`;
			});
			qkeys += ') ';
			if (!hasPrimaryKey && !this.isAutoIncrementPK_)
				return resumeFunction([
					false,
					`The primary key '${this.primaryKey_} for the table ''${this.dbName_}'.'${this.tableName_}' was not present in the request.`,
				]);
			let qvalues = 'VALUES (';
			values.forEach((partialV, idx, arr) => {
				qvalues += `'${partialV.Value}'${idx !== arr.length - 1 ? ', ' : ''}`;
			});
			qvalues += ');';

			query += qkeys + qvalues;
			this.connection_.query(query, (err) => {
				if (err) return resumeFunction([false, err.message]);
				return resumeFunction([true, '']);
			});
		});
	}
}
