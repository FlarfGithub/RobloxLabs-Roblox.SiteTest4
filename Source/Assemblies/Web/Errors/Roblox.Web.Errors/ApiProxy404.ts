import { Request, Response } from 'express';
import { ErrorsClient } from '../../Util/Roblox.Web.Util/ErrorsClient';
import { InputValidator } from '../../Util/Roblox.Web.Util/Validators/InputValidator';

export const ApiProxy404 = (request: Request, response: Response) => {
	const inputValidatorClient = new InputValidator();

	const errorsClient = new ErrorsClient(response);
	if (inputValidatorClient.CheckDoesStringIncludeASPExtension(request.path)) {
		errorsClient.RespondWithAHttpStatusError(400);
	} else {
		errorsClient.RespondWithAHttpStatusError(404);
	}
};
