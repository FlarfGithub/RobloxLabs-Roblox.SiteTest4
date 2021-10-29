import { IEnumerator } from '../../../System/Collections/Generic/IEnumerator';
import { IPortElement } from './Arbiters/IPortElement';
import { Handler } from './Handler';

export interface ITask {
	LinkedIterator: object;

	ArbiterCleanupHandler: Handler;

	// TaskQueue: DispatcherQueue;

	[index: number]: IPortElement;

	PortElementCount: int;

	PartialClone(): ITask;

	Execute(): IEnumerator<ITask>;
}
