import { UsernameValidationContext } from '../Enumerations/UsernameValidationContext';

export interface IUsernameValidationRequest {
	/**
	 * The username
	 */
	username: string;
	/**
	 * The birthday
	 */
	birthday: string; // Get the Date from this string.

	/**
	 * {Roblox.Authentication.Api.Models.UsernameValidationContext}
	 */
	context: UsernameValidationContext;
}
