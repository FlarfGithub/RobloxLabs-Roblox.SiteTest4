import { IEnumeratorBase } from './IEnumeratorBase';

export interface IEnumerableBase {
	GetEnumerator?(): IEnumeratorBase;
}
