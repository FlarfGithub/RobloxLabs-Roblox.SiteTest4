import { IDisposable } from '../../IDisposable';
import { IEnumeratorBase } from '../IEnumeratorBase';

export interface IEnumerator<T> extends IDisposable, IEnumeratorBase {
	readonly Current: T;
}
