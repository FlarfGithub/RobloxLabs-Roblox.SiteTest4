import { Response } from 'express';
import { ICustomError } from '../../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { ErrorsClient } from '../ErrorsClient';
import { IServiceValidatorBase } from './Interfaces/IServiceValidatorBase';

export class ContentTypeValidator<TResponse extends Response> implements IServiceValidatorBase<string, bool> {
	private readonly _response: TResponse;
	private readonly _hasBody: bool;

	public constructor(response: TResponse, hasBody: bool = false) {
		this._response = response;
		this._hasBody = hasBody;
	}

	public Validate(originalContentType: string, contentTypeToValidate: string, isService: boolean = false) {
		const contentTypesToValidate = contentTypeToValidate !== null ? [contentTypeToValidate] : [];
		return this.MultiValidate(originalContentType, contentTypesToValidate, isService);
	}
	public MultiValidate(originalContentType: string, contentTypesToValidate: string[], isService: boolean = false): boolean {
		const errors: ICustomError[] = [];
		const errorsClient = new ErrorsClient(this._response);
		if (!originalContentType) {
			const errorMessage =
				"The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.";
			if (isService) {
				if (this._hasBody) {
					errorsClient.RespondWithAServiceError(415, errorMessage, true);
				} else {
					errorsClient.RespondWithAServiceError(500, 'An error has occurred.', true);
				}
				return false;
			}
			errors.push({
				code: 0,
				message: errorMessage,
			});
			errorsClient.RespondWithCustomErrors(415, errors, true);
			return false;
		}
		originalContentType = originalContentType.toLowerCase();
		let contentTypeIsValid = false;
		if (contentTypesToValidate.length > 0) {
			contentTypesToValidate.every((contentType) => {
				contentType = contentType.toLowerCase();
				if (contentType === originalContentType) {
					contentTypeIsValid = true;
					return false;
				}
				return true;
			});
		} else {
			contentTypeIsValid = true;
		}

		if (!contentTypeIsValid) {
			const errorMessage = `The request entity's media type '${originalContentType}' is not supported for this resource.`;
			if (isService) {
				errorsClient.RespondWithAServiceError(415, errorMessage, true);
				return false;
			}

			errors.push({
				code: 0,
				message: errorMessage,
			});
			errorsClient.RespondWithCustomErrors(415, errors, true);
			return false;
		}
		return true;
	}
}
