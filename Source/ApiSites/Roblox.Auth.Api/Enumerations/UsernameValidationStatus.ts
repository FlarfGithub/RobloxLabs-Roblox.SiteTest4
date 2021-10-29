export enum UsernameValidationStatus {
	ValidUsername,
	AlreadyInUseError,
	ModerationError,
	InvalidLengthError,
	StartsOrEndsWithUnderscoreError,
	TooManyUnderscoresError,
	ContainsSpacesError,
	InvalidCharactersError,
	ContainsPiiError,
	ContainsReservedUsernameError,
}
