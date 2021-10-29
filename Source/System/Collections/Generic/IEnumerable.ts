import { IEnumerableBase } from '../IEnumerableBase';
import { IEnumerator } from './IEnumerator';

export interface IEnumerable<T> extends IEnumerableBase {
	GetEnumerator(): IEnumerator<T>;
}
