import { IEnumerableBase } from '../../Collections/IEnumerableBase';
import { IEnumeratorBase } from '../../Collections/IEnumeratorBase';
import { IDisposable } from '../../IDisposable';
import { IDataReader } from '../IDataReader';
import { IDataRecord } from '../IDataRecord';

export abstract class DbDataReader implements IDataReader, IDisposable, IDataRecord, IEnumerableBase {
	public abstract GetEnumerator?(): IEnumeratorBase;

	public abstract readonly Depth: number;

	public abstract readonly FieldCount: number;

	public abstract readonly HasRows: boolean;

	public abstract readonly IsClosed: boolean;

	public abstract readonly RecordsAffected: boolean;

	public get VisibleFieldCount() {
		return this.FieldCount;
	}

	readonly [ordinal: number]: any;

	readonly [name: string]: any;

	public Close(): void {}

	public Dispose(): void;
	public Dispose(disposing: boolean): void;

	public Dispose(disposing?: boolean) {
		if (disposing === undefined) return this.Dispose(true);
		if (disposing) this.Close();
	}

	public abstract NextResult(): boolean;

	public abstract Read(): boolean;
}
