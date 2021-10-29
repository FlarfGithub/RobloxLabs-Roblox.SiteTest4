import { IEnumerator } from '../../../System/Collections/Generic/IEnumerator';
import { IPortElement } from './Arbiters/IPortElement';
import { Handler } from './Handler';
import { ITask } from './ITask';

export abstract class TaskCommon implements ITask {
	public get ArbiterCleanupHandler() {
		return this._ArbiterCleanupHandler;
	}
	public set ArbiterCleanupHandler(value: Handler) {
		this._ArbiterCleanupHandler = value;
	}

	public get LinkedIterator() {
		return this._linkedIterator;
	}
	public set LinkedIterator(value: object) {
		this._linkedIterator = value;
	}

	// public get TaskQueue() {
	// 	return this._dispatcherQueue;
	// }
	// public set TaskQueue(value: DispatcherQueue) {
	// 	this._dispatcherQueue = value;
	// }

	public abstract PartialClone(): ITask;

	[index: number]: IPortElement;

	public abstract readonly PortElementCount: int;
	public abstract Execute(): IEnumerator<ITask>;
	public _previous: TaskCommon;
	public _next: TaskCommon;
	private _ArbiterCleanupHandler: Handler;
	private _linkedIterator: object;
	// private _dispatcherQueue: DispatcherQueue;
}
