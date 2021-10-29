import { Response } from 'express';
import { HttpRequestMethodEnum } from '../../../../Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';
import { ICustomError } from '../../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { ErrorsClient } from '../ErrorsClient';
import { IServiceValidatorBase } from './Interfaces/IServiceValidatorBase';

export class MethodValidator<TResponse extends Response> implements IServiceValidatorBase<string, HttpRequestMethodEnum> {
	private readonly _response: TResponse;

	public constructor(response: TResponse) {
		this._response = response;
	}

	/**
	 * Checks if the request method matches the given {methodToValidate} for the MethodValidator.
	 *
	 * @param {string} originalMethod The original request method, to be converted to lowercase etc.
	 * @param {string} methodToValidate The method to validate.
	 * @param {Response} response A response to pass in to be injected into the {Roblox.Web.Util.Errors}.
	 * @param {boolean} isService If true, will use the ServiceError instead of the CustomError.
	 * @returns {[boolean, HttpRequestMethodEnum]} Returns true if the request method verb matches any of the given methods below.
	 */
	public Validate(originalMethod: string, methodToValidate: string, isService: boolean = false): HttpRequestMethodEnum {
		return this.MultiValidate(originalMethod, [methodToValidate], isService);
	}

	/**
	 * Checks if the request method matches the given {methodsToValidate} for the MethodValidator.
	 *
	 * @param {string} originalMethod The original request method, to be converted to lowercase etc.
	 * @param {string[]} methodsToValidate The methods to validate.
	 * @param {Response} response A response to pass in to be injected into the {Roblox.Web.Util.Errors}.
	 * @param {boolean} isService If true, will use the ServiceError instead of the CustomError.
	 * @returns {[boolean, HttpRequestMethodEnum]} Returns true if the request method verb matches any of the given methods below.
	 */
	public MultiValidate(originalMethod: string, methodsToValidate: string[], isService: boolean = false): HttpRequestMethodEnum {
		const errors: ICustomError[] = [];
		const errorsClient = new ErrorsClient(this._response);
		originalMethod = originalMethod.toLowerCase();
		if (originalMethod === 'options') return HttpRequestMethodEnum.OPTIONS;
		let methodIsValid = false;
		let requestMethod = HttpRequestMethodEnum.GET;
		const allowedMethods = methodsToValidate.join(', ');
		methodsToValidate.every((method) => {
			method = method.toLowerCase();
			if (method === originalMethod) {
				methodIsValid = true;
				switch (originalMethod) {
					case 'post':
						requestMethod = HttpRequestMethodEnum.POST;
						break;
					case 'put':
						requestMethod = HttpRequestMethodEnum.PUT;
						break;
					case 'delete':
						requestMethod = HttpRequestMethodEnum.DELETE;
						break;
					case 'head':
						requestMethod = HttpRequestMethodEnum.HEAD;
						break;
					case 'patch':
						requestMethod = HttpRequestMethodEnum.PATCH;
						break;
					case 'get':
						requestMethod = HttpRequestMethodEnum.GET;
						break;
					default:
						requestMethod = HttpRequestMethodEnum.UNKNOWN;
						break;
				}
				return false;
			}
			return true;
		});
		if (!methodIsValid) {
			const errorMessage = `The requested resource does not support http method '${originalMethod.toUpperCase()}'.`;
			if (isService) {
				this._response.header({ Allow: allowedMethods });
				errorsClient.RespondWithAServiceError(405, errorMessage, true);
				return HttpRequestMethodEnum.UNKNOWN;
			}
			errors.push({ code: 0, message: errorMessage });
			errorsClient.RespondWithCustomErrors(405, errors, true);
			return HttpRequestMethodEnum.UNKNOWN;
		}
		return requestMethod;
	}
}
