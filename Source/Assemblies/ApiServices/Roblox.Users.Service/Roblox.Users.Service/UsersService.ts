import { Response } from 'express';
import { IServiceUsernameValidationRequest } from '../../../ApiClients/Roblox.Users.Client/Models/IServiceUsernameValidationRequest';
import { IServiceUsernameValidationResponse } from '../../../ApiClients/Roblox.Users.Client/Models/IServiceUsernameValidationResponse';
import { UsernameValidationStatus } from '../../../../ApiSites/Roblox.Auth.Api/Enumerations/UsernameValidationStatus';
import { User } from '../../../Platform/Membership/Roblox.Platform.Membership/User';
import { InputValidator } from '../../../Web/Util/Roblox.Web.Util/Validators/InputValidator';

export namespace UsersService {
	export namespace Validators {
		function validateDoesUsernameContainProfanity(
			partialResponse: IServiceUsernameValidationResponse,
			response: Response,
			inputValidatorClient: InputValidator,
		) {
			if (inputValidatorClient.CheckDoesStringIncludeProfanity(partialResponse.Username)) {
				response.send({
					...partialResponse,
					Status: UsernameValidationStatus.ModerationError,
					InternalMessage: 'Username not appropriate for Roblox',
				});
				return true;
			}
		}

		function validateDoesUsernameContainInvalidChars(
			partialResponse: IServiceUsernameValidationResponse,
			response: Response,
			inputValidatorClient: InputValidator,
		) {
			if (inputValidatorClient.CheckDoesStringIncludeInvalidChars(partialResponse.Username)) {
				response.send({
					...partialResponse,
					Status: UsernameValidationStatus.InvalidCharactersError,
					InternalMessage: 'Only a-z, A-Z, 0-9, and _ are allowed',
				});
				return true;
			}
			return false;
		}

		function validateDoesUsernameContainWhiteSpace(
			partialResponse: IServiceUsernameValidationResponse,
			response: Response,
			inputValidatorClient: InputValidator,
		) {
			if (inputValidatorClient.CheckDoesStringIncludeWhitespace(partialResponse.Username)) {
				response.send({
					...partialResponse,
					Status: UsernameValidationStatus.ContainsSpacesError,
					InternalMessage: 'Username cannot contain spaces',
				});
				return true;
			}
			return false;
		}

		function validateDoesUsernameHaveMoreThanOneUnderscore(partialResponse: IServiceUsernameValidationResponse, response: Response) {
			if ((partialResponse.Username.match(/_/g) || []).length > 1) {
				response.send({
					...partialResponse,
					Status: UsernameValidationStatus.TooManyUnderscoresError,
					InternalMessage: 'Usernames can have at most one _',
				});
				return true;
			}
			return false;
		}

		function validateIsNameLongOrTooLong(partialResponse: IServiceUsernameValidationResponse, response: Response) {
			if (partialResponse.Username.length < 3 || partialResponse.Username.length > 20) {
				response.send({
					...partialResponse,
					Status: UsernameValidationStatus.InvalidLengthError,
					InternalMessage: 'Usernames can be 3 to 20 characters long',
				});
				return true;
			}
			return false;
		}

		function validateDoesUsernameStartOrEndwithUnderscore(partialResponse: IServiceUsernameValidationResponse, response: Response) {
			if (partialResponse.Username.startsWith('_') || partialResponse.Username.endsWith('_')) {
				response.send({
					...partialResponse,
					Status: UsernameValidationStatus.StartsOrEndsWithUnderscoreError,
					InternalMessage: 'Username can’t start or end with _',
				});

				return true;
			}
			return false;
		}

		async function validateDoesUsernameExist(partialResponse: IServiceUsernameValidationResponse, response: Response) {
			if (await User.CheckIfUsernameExists(partialResponse.Username)) {
				response.send({
					...partialResponse,
					Status: UsernameValidationStatus.AlreadyInUseError,
					InternalMessage: 'Username is already in use',
				});
				return true;
			}
			return false;
		}

		export async function ValidateUsername(
			request: IServiceUsernameValidationRequest,
			response: Response<IServiceUsernameValidationResponse>,
		) {
			const partialResponse: IServiceUsernameValidationResponse = <IServiceUsernameValidationResponse>{
				IUser: request.IUser,
				Username: request.Request.username,
				Context: request.Request.context,
				IsRCC: false, // TODO RCCService IP validations here.
				Birthdate: request.Request.birthday,
			};

			const inputValidatorClient = new InputValidator();

			if (validateDoesUsernameContainInvalidChars(partialResponse, response, inputValidatorClient)) return;
			if (validateIsNameLongOrTooLong(partialResponse, response)) return;
			if (validateDoesUsernameStartOrEndwithUnderscore(partialResponse, response)) return;
			if (validateDoesUsernameHaveMoreThanOneUnderscore(partialResponse, response)) return;
			if (validateDoesUsernameContainWhiteSpace(partialResponse, response, inputValidatorClient)) return;
			if (validateDoesUsernameContainProfanity(partialResponse, response, inputValidatorClient)) return;
			if (await validateDoesUsernameExist(partialResponse, response)) return;

			return response.send({
				...partialResponse,
				Status: UsernameValidationStatus.ValidUsername,
				InternalMessage: 'Username is valid',
			});
		}
	}
}
