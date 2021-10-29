import { Type } from './Type';

export interface IFormatProvider {
	// Interface does not need to be marked with the serializable attribute
	GetFormat(formatType: Type): Object;
}
