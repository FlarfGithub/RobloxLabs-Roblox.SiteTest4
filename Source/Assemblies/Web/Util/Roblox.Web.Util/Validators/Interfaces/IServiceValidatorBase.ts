import { ISingleServiceValidatorBase } from './ISingleServiceValidatorBase';

export interface IServiceValidatorBase<TType, TReturnType> extends ISingleServiceValidatorBase<TType, TReturnType> {
	Validate(originalValue: TType, valueToValidate: TType, isService: bool): TReturnType;
	MultiValidate(originalValue: TType, valuesToValidate: TType[], isService: bool): TReturnType;
}
