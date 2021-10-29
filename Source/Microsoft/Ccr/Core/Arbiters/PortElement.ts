import { IPort } from '../IPort';
import { IPortElement, IPortElementGeneric } from './IPortElement';

export class PortElement<T> implements IPortElementGeneric<T>, IPortElement {
	public get Owner() {
		return this._Owner;
	}
	public set Owner(value: IPort) {
		this._Owner = value;
	}

	public get Next() {
		return this._next;
	}

	public set Next(value: PortElement<T>) {
		this._next = value;
	}

	public get Previous() {
		return this._previous;
	}

	public set Previous(value: PortElement<T>) {
		this._previous = value;
	}

	public get CausalityContext() {
		return this._causalityContext;
	}

	public set CausalityContext(value: object) {
		this._causalityContext = value;
	}

	public get Item() {
		return <object>(<unknown>this._item);
	}

	public get TypedItem() {
		return this._item;
	}

	public set TypedItem(value: T) {
		this._item = value;
	}

	public constructor(item: T);
	public constructor(item: T, owner: IPort);

	public constructor(item: T, owner?: IPort) {
		this._Owner = owner;
		this._item = item;
	}

	private _Owner: IPort; // TODO: Port<T> here.
	public _next: PortElement<T>;
	public _previous: PortElement<T>;
	public _causalityContext: object;
	public _item: T;
}
