import { IDisposable } from '../IDisposable';
import { IDataRecord } from './IDataRecord';

export interface IDataReader extends IDisposable, IDataRecord {
	/**
	 * Gets a value indicating the depth of nesting for the current row.
	 */
	readonly Depth: number;

	/**
	 * Gets a value indicating whether the data reader is closed.
	 */
	readonly IsClosed: boolean;

	/**
	 * Gets the number of rows changed, inserted, or deleted by execution of the SQL statement.
	 */
	readonly RecordsAffected: boolean;

	/**
	 * Closes the System.Data.IDataReader Object.
	 */
	Close(): void;

	// TODO Implement System.Data.DataTable (8k+ lines)
	/**
	 * Returns a System.Data.DataTable that describes the column metadata of the System.Data.IDataReader
	 */
	/* GetSchemaTable(): DataTable; */

	/**
	 * Advances the data reader to the next result, when reading the results of batch SQL statements.
	 */
	NextResult(): boolean;

	/**
	 * Advances the System.Data.IDataReader to the next record.
	 */
	Read(): boolean;
}
