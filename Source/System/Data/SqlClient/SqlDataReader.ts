import { IEnumeratorBase } from '../../Collections/IEnumeratorBase';
import { IDisposable } from '../../IDisposable';
import { DbDataReader } from '../Common/DbDataReader';
import { IDataReader } from '../IDataReader';
import { IDataRecord } from '../IDataRecord';

export class SqlDataReader extends DbDataReader implements IDataReader, IDisposable, IDataRecord {
	public GetEnumerator?(): IEnumeratorBase {
		throw new Error('Method not implemented.');
	}
	public Depth: number;
	public FieldCount: number;
	public HasRows: boolean;
	public IsClosed: boolean;
	public RecordsAffected: boolean;
	public NextResult(): boolean {
		throw new Error('Method not implemented.');
	}
	public Read(): boolean {
		throw new Error('Method not implemented.');
	}
	[k: string]: any;
}
