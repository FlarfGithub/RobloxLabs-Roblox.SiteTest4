import { Response } from 'express';
import { IServiceValidatorBase } from './Interfaces/IServiceValidatorBase';
export class ApiKeyValidator<TResponse extends Response, TDefaultResponsType extends any> implements IServiceValidatorBase<string, bool> {
	private readonly _response: TResponse;
	private readonly _optionalResponseData: TDefaultResponsType;

	public constructor(response: TResponse, optionalResponseData: TDefaultResponsType) {
		this._response = response;
		this._optionalResponseData = optionalResponseData;
	}

	public Validate(originalValue: string, valueToValidate: string, isService: bool): bool {
		return this.MultiValidate(originalValue, [valueToValidate], isService);
	}

	public MultiValidate(originalValue: string, valuesToValidate: string[], isService: bool): bool {
		if (!originalValue) {
			this._response.statusMessage = 'ApiKey required in Guid format.';
			this._response.status(503).send(this._optionalResponseData);
			return false;
		}

		if (!originalValue.match(/(.{8})(.{4})(.{4})(.{4})(.{12})/)) {
			this._response.statusMessage = 'ApiKey required in Guid format.';
			this._response.status(503).send(this._optionalResponseData);
			return false;
		}
		let isValid = false;
		valuesToValidate.every((apiKeyToValidate) => {
			if (apiKeyToValidate.toLowerCase() === originalValue.toLowerCase()) {
				isValid = true;
				return false;
			}
			return true;
		});
		if (!isValid) {
			this._response.statusMessage = 'Invalid client credentials.';
			this._response.status(503).send(this._optionalResponseData);
			return false;
		}
		return true;
	}
}
