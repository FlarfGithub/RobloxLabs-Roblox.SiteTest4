import { ISerializable } from './Runtime/Serialization/ISerializable';
import { SystemException } from './SystemException';

export class ArgumentException extends SystemException implements ISerializable {
	public constructor();

	public constructor(message: string);

	public constructor(message?: string) {
		super(message, null);
	}
}
