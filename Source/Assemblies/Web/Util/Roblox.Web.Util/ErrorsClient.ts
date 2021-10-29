import { Response } from 'express';
import { DFFlag, DYNAMIC_FASTFLAGVARIABLE } from './Logging/FastLog';
import { ICustomError } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { ICustomErrorList } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomErrorList';
import { IServiceError } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/IServiceError';
import { Common } from './Common/StatusCodes';
import stack from 'stack-trace';
import filestream from 'fs';
import errorText from 'source-code-error';

DYNAMIC_FASTFLAGVARIABLE('Debug', false);

export class ErrorsClient<TResponse extends Response> {
	private readonly _response: TResponse;

	public constructor(response: TResponse) {
		this._response = response;
	}

	public RespondWithAServiceError(statusCode: number, message: string, shouldEndResponse: boolean = true) {
		const ServiceError: IServiceError = { Message: message };
		this._response.status(statusCode).send(ServiceError);
		if (shouldEndResponse) this._response.end();
	}

	public RespondWithCustomErrors(statusCode: number, customErrors: ICustomError[], shouldEndResponse: boolean = true) {
		const CustomErrorList: ICustomErrorList = { errors: customErrors };
		this._response.status(statusCode).send(CustomErrorList);
		if (shouldEndResponse) this._response.end();
	}

	///////////////////////////
	// Responders
	///////////////////////////
	/**
	 * Determines the current enviornment in order to respond with the correct error types.
	 * USE THIS FOR ALL UNHANDLED ERRORS.
	 * @param {Response} response The response to be hooked.
	 * @param {Error} exception The exception to be used.
	 * @returns {void} Returns nothing.
	 */
	public RespondWithAHttpError(exception: Error): void {
		if (DFFlag('Debug')) return this.RespondWithADetailedError(this._response, exception);
		return this.RespondWithInternalServerError();
	}

	/**
	 * Use this if NOT development.
	 * @param {Response} response The response to be hooked.
	 * @returns {void} Returns nothing.
	 */
	public RespondWithInternalServerError(): void {
		const customErrors: ICustomError[] = [{ code: 500, message: 'InternalServerError' }];
		this.RespondWithCustomErrors(500, customErrors, true);
		return;
	}

	/**
	 * Respond with a Http Status Code error.
	 * @param {number} status The status code.
	 * @param {Response} response The response to be hooked.
	 * @returns {void} Returns nothing.
	 */
	public RespondWithAHttpStatusError(status: number): void {
		const customErrors: ICustomError[] = [{ code: status || 0, message: Common.StatusCodes[status.toString()] || 'Unknown' }];
		this.RespondWithCustomErrors(status, customErrors, true);
		return;
	}

	/**
	 * Respond with a default Http error.
	 * @param {number} status The status code that appears in the response.
	 * @param {Response} response The response to hook.
	 * @returns {void} Returns nothing.
	 */
	public RespondWithADefaultHttpError(status: number): void {
		const customErrors: ICustomError[] = [{ code: 0, message: 'Something went wrong with the request, see response status code.' }];
		this.RespondWithCustomErrors(status, customErrors, true);
		return;
	}

	/**
	 * Responds with a detailed error based on the exception given.
	 * @param {Response} response The response to hook.
	 * @param {Error} exception The exception to parse.
	 * @returns {void} Returns nothing.
	 */
	public RespondWithADetailedError(response: Response, exception: Error): void {
		const customErrors: ICustomError[] = [{ code: 500, message: `${exception.stack}`.replace('Error:', '') }];
		this.RespondWithCustomErrors(500, customErrors, true);
		return;
	}

	public static GetErrorLine(error: Error) {
		const StackTrace = stack.parse(error);
		let id = 0;
		if ((<any>error).type) {
			id = 1;
		}
		const fileName = StackTrace[id].getFileName();

		const code = filestream.readFileSync(fileName, 'utf8');
		let text: string = errorText({
			filename: StackTrace[id].getFileName(),
			code: code,
			line: StackTrace[id].getLineNumber(),
			column: StackTrace[id].getColumnNumber(),
		});

		text = text.replace(
			`ERROR: file "${StackTrace[id].getFileName()}", line ${StackTrace[id].getLineNumber()}, column ${StackTrace[
				id
			].getColumnNumber()}:`,
			'',
		);

		const split = text.split('\n');

		const linesBefore = `\n${split[0]}\n${split[1]}\n${split[2]}\n`;
		const errorLine = `${split[3]}\n`;
		const linesAfter = `${split[5]}\n${split[6]}`;

		return {
			CodeBefore: linesBefore,
			CodeError: errorLine,
			CodeAfter: linesAfter,
		};
	}
}
