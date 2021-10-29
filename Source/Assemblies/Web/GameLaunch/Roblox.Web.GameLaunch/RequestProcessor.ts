import { Response } from 'express';
import { IError } from '../../../../Websites/Roblox.GameWebsite/Models/Game/Error';
import { GameJoinRequest } from '../../../../Websites/Roblox.GameWebsite/Models/Game/GameJoinRequest';
import { UserAgentHelper } from '../../../UserAgents/Roblox.UserAgents/UserAgentHelper';
import { RequestType } from './Enumeration/RequestType';
import { ResponseStatus } from './Enumeration/ResponseStatus';
import { GameLaunchFactory } from './GameLaunchFactory';
import { IGameLaunchBase } from './Interfaces/IGameLaunchBase';
import { IGameLaunchResponseBase } from './Interfaces/IGameLaunchResponseBase';

/*
PlaceLauncher Status Key

0: "" (Retry for client, no string for MadStatus)
1: "A server is loading the game..." (Retry for client)
2: "The server is ready. Joining the game..."
3: "Joining games is temporarily disabled while we upgrade. Please try again soon." (Displayed by MadStatus but results in an error for the client)
4: "An error occurred. Please try again later." (Displayed by MadStatus but results in an error for the client)
5: "The game you requested has ended." (Displayed by MadStatus but results in an error for the client)
6: "The game you requested is currently full. Waiting for an opening..."
7: "Roblox is updating. Please wait..." (Used by MadStatus)
8: "Requesting a server" (Displayed before a request is sent to PlaceLauncher.ashx)

            // Place join status results
            // Waiting = 0,
            // Loading = 1,
            // Joining = 2,
            // Disabled = 3,
            // Error = 4,
            // GameEnded = 5,
            // GameFull = 6
            // UserLeft = 10
            // Restricted = 11
*/

/*
RequestGameJob
RequestGame
RequestPrivateGame
CloudEdit
RequestFollowUser
RequestPlayWithParty
*/

export class GameLaunchRequestProcessor {
	private readonly _response: Response;

	public constructor(response: Response) {
		this._response = response;
	}

	public CheckUseragent(userAgent?: string, referrer?: string): bool {
		if (referrer) {
			if (!UserAgentHelper.CheckIfStringIsValidUrl(referrer)) return true;
		}

		if (!UserAgentHelper.CheckIsUserAgentRoblox(userAgent)) {
			GameLaunchRequestProcessor.ReportISXError(
				this._response,
				'Request is not authorized from specified origin',
				userAgent,
				referrer,
				true,
				true,
			);
			return false;
		}

		return true;
	}

	private reportDebatableError(status: ResponseStatus, message: string): void {
		this._response.status(200).send(<IGameLaunchResponseBase>{
			jobId: null,
			status: status,
			joinScriptUrl: null,
			authenticationUrl: null,
			authenticationTicket: null,
			message: message,
		});
	}

	public static ReportISXError(
		response: Response,
		message: string,
		userAgent?: string,
		referrer?: string,
		nullableParams: bool = false,
		caseableErrors: bool = false,
	) {
		response.status(caseableErrors ? 403 : 200).send(<IError>{
			Error: message,
			userAgent: userAgent && nullableParams === undefined ? null : userAgent,
			referrer: referrer && nullableParams === undefined ? null : referrer,
		});
	}

	public RunRoundTrain(query: GameJoinRequest): boolean {
		const requestType: RequestType = RequestType[query ? query.requestType : ''];

		if (!requestType) {
			GameLaunchRequestProcessor.ReportISXError(this._response, 'Invalid request type');
			return false;
		}

		if (!GameLaunchFactory.IsInitialized) GameLaunchFactory.Init(this._response);

		const factory: IGameLaunchBase = GameLaunchFactory.Get(requestType);

		if (!factory.Invoke(null, this.reportDebatableError)) return false;
		return true;
	}
}
