// import { IConvertible } from './IConvertible';
import { ISerializable } from './Runtime/Serialization/ISerializable';

export class DBNull implements ISerializable /*, IConvertible */ {
	static Value: any;
	private constructor() {}
}
