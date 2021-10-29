export interface ISingleValidatorBase<TType, TReturnType> {
	Validate(originalValue: TType, valueToValidate: TType): TReturnType;
}
