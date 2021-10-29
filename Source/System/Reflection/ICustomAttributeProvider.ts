import { Type } from '../Type';

export interface ICustomAttributeProvider {
	GetCustomAttributes(attributeType: Type, inherit: boolean): any[];

	GetCustomAttributes(inherit: boolean): any[];

	IsDefined(attributeType: Type, inherit: boolean): boolean;
}
