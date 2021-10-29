import { Response } from 'express';
import { ErrorsClient } from '../ErrorsClient';
import { ISingleValidatorBase } from './Interfaces/ISingleValidatorBase';

export class ProtocolValidator<TResponse extends Response> implements ISingleValidatorBase<string, bool> {
	private readonly _errorsClient: ErrorsClient<TResponse>;

	public constructor(response: TResponse) {
		if (response !== null) this._errorsClient = new ErrorsClient(response);
	}

	public Validate(originalValue: string, itShouldBe: string): boolean {
		originalValue = originalValue.toLowerCase();
		if (originalValue !== itShouldBe) {
			if (this._errorsClient !== undefined)
				this._errorsClient.RespondWithCustomErrors(
					403,
					[
						{
							code: 0,
							message: `${itShouldBe.toUpperCase()} Required`,
						},
					],
					true,
				);
			return false;
		}
		return true;
	}
}
