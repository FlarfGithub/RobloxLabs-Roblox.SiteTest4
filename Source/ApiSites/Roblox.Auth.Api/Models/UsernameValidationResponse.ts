import { UsernameValidationStatus } from '../Enumerations/UsernameValidationStatus';

/**
 * A result representing the information about if username is valid or not.
 */
export interface IUsernameValidationResponse {
	/**
	 * The {Roblox.Authentication.Api.Models.UsernameValidationStatus} of the username validation.
	 */
	code: UsernameValidationStatus;
	/**
	 * The response message of the username validation.
	 */
	message: string;
}
