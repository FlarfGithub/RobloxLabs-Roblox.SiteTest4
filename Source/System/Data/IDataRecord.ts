export interface IDataRecord {
	readonly FieldCount: number;

	[i: number]: any;

	[name: string]: any;
}
