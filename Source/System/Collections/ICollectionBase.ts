import { IEnumerableBase } from './IEnumerableBase';

export interface ICollectionBase extends IEnumerableBase {
	CopyTo(array: Array<any>, index: number): void;
}
