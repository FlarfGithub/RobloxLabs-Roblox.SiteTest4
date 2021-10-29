import { Request, Response } from 'express';
import { UsersClient } from '../../../ApiClients/Roblox.Users.Client/Implementation/UsersClient';
import { IServiceUsernameValidationResponse } from '../../../ApiClients/Roblox.Users.Client/Models/IServiceUsernameValidationResponse';
import { IUsernameValidationRequest } from '../../../../ApiSites/Roblox.Auth.Api/Models/UsernameValidationRequest';
import { IUsernameValidationResponse } from '../../../../ApiSites/Roblox.Auth.Api/Models/UsernameValidationResponse';
import { UsernameValidationContext } from '../../../../ApiSites/Roblox.Auth.Api/Enumerations/UsernameValidationContext';
import { Task } from '../../../../System/Threading/Task';
import { ICustomError } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { IUser } from '../../../Platform/Membership/Roblox.Platform.Membership/IUser';
import { ErrorsClient } from '../../Util/Roblox.Web.Util/ErrorsClient';
import { ContentTypeValidator } from '../../Util/Roblox.Web.Util/Validators/ContentTypeValidator';
import { InputValidator } from '../../Util/Roblox.Web.Util/Validators/InputValidator';

export class AuthRequestProcessor {
	private _response: Response;
	private _request: Request<null, IUsernameValidationResponse, IUsernameValidationRequest, IUsernameValidationRequest>;

	public constructor(
		request: Request<null, IUsernameValidationResponse, IUsernameValidationRequest, IUsernameValidationRequest>,
		response: Response,
	) {
		this._request = request;
		this._response = response;
	}

	/**
	 * A private function that sanitizes the request and returns a {Roblox.Auth.Api.Models.UsernameValidationRequest}
	 * @param {IUsernameValidationRequest} data The original request body.
	 * @param {ICustomError[]} errors A cross-referenced error-set, so they aren't defined twice. TODO: Put this in the class-base.
	 * @param {IUser} authenticatedUser The authenticated user to use.
	 * @param {Response} response A response to pass in to be injected into the {Roblox.Web.Util.Errors}.
	 * @returns {[boolean, IUsernameValidationRequest]} Returns an IUsernameValidationRequest if the body was validated successfully.
	 * @internal This method is private and internal, and should only be used inside of the AuthRequestProcessor.UsernameValidation
	 */
	private checkRequest(
		data: IUsernameValidationRequest,
		errors: ICustomError[],
		authenticatedUser: IUser,
		client: ErrorsClient<Response>,
	): [boolean, IUsernameValidationRequest] {
		const newRequest: IUsernameValidationRequest = data;
		const inputValidatorClient = new InputValidator();

		if (!data.username || data.username.length === 0) {
			errors.push({
				code: 1,
				message: 'A valid username is required.',
				userFacingMessage: 'Something went wrong',
			});
			client.RespondWithCustomErrors(400, errors, true);
			return [false, null];
		}
		if (!inputValidatorClient.CheckIsDateStringAnISODate(data.birthday)) {
			// Check if the user is authenticated via the passed in IUser
			if (!authenticatedUser) {
				errors.push({
					code: 2,
					message: 'A valid birthday or authenticated user is required.',
					userFacingMessage: 'Something went wrong',
				});
				client.RespondWithCustomErrors(400, errors, true);
				return [false, null];
			}
			newRequest.birthday = authenticatedUser.Created; // Use Created until BirthDay is implemented to the entity.
		}

		if (!data.context) newRequest.context = UsernameValidationContext.Unknown;
		return [true, newRequest];
	}

	public CheckRequest(isUsingPost: boolean, authenticatedUser: IUser): [boolean, IUsernameValidationRequest] {
		const errors: ICustomError[] = [];
		const contentType = this._request.headers['content-type'];
		const errorsClient = new ErrorsClient(this._response);
		const contentTypeValidatorClient = new ContentTypeValidator(this._response);

		let data = isUsingPost ? this._request.body : this._request.query;

		if (!data) {
			errors.push({ code: 1, message: 'A valid username is required.', userFacingMessage: 'Something went wrong' });
			errorsClient.RespondWithCustomErrors(400, errors, true);
			return [false, null];
		}
		if (isUsingPost)
			if (
				!contentTypeValidatorClient.MultiValidate(contentType, [
					'application/json',
					'text/json',
					'application/x-www-form-urlencoded',
				])
			)
				return [false, null];
		if (!isUsingPost)
			data = {
				username: data.username || (<any>data)['request.username'],
				birthday: data.birthday || (<any>data)['request.birthday'],
				context: data.context || (<any>data)['request.context'],
			};
		const [IsSuccessful, ParsedBody] = this.checkRequest(data, errors, authenticatedUser, errorsClient);
		if (!IsSuccessful) return [false, null];
		return [true, ParsedBody];
	}

	//

	public async ValidateUsername(
		authenticatedUser: IUser,
		request: IUsernameValidationRequest,
		isSecure: boolean = true,
	): Task<[boolean, IServiceUsernameValidationResponse, Error]> {
		return new Promise<[boolean, IServiceUsernameValidationResponse, Error]>(async (resumeFunction) => {
			const [WasRequestSuccessful, , Response, Error] = await UsersClient.ValidateUsername({
				IUser: authenticatedUser,
				Request: request,
				IsSecure: isSecure,
			});

			return resumeFunction([WasRequestSuccessful, Response, Error]);
		});
	}
}
