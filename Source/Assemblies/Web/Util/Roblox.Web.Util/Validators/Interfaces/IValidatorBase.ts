import { ISingleValidatorBase } from './ISingleValidatorBase';

export interface IValidatorBase<TType, TReturnType> extends ISingleValidatorBase<TType, TReturnType> {
	Validate(originalValue: TType, valueToValidate: TType): TReturnType;
	MultiValidate(originalValue: TType, valuesToValidate: TType[]): TReturnType;
}
