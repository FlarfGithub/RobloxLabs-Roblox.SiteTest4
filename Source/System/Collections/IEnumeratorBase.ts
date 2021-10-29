export interface IEnumeratorBase {
	MoveNext(): boolean;

	readonly Current: any;

	Reset(): void;
}
