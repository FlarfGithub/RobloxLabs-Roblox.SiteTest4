export interface ISingleServiceValidatorBase<TType, TReturnType> {
	Validate(originalValue: TType, valueToValidate: TType, isService: bool): TReturnType;
}
