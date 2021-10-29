import { Response } from 'express';
import { RequestType } from './Enumeration/RequestType';
import { CloudEdit } from './Factories/CloudEdit';
import { RequestFollowUser } from './Factories/RequestFollowUser';
import { RequestGame } from './Factories/RequestGame';
import { RequestGameJob } from './Factories/RequestGameJob';
import { RequestPlayWithParty } from './Factories/RequestPlayWithParty';
import { RequestPrivateGame } from './Factories/RequestPrivateGame';
import { IGameLaunchBase } from './Interfaces/IGameLaunchBase';
import { GameLaunchRequestProcessor } from './RequestProcessor';

export class GameLaunchFactory {
	private static _response: Response;

	public static IsInitialized = false;

	public static Init(response: Response) {
		if (!this.IsInitialized) {
			GameLaunchFactory._response = response;
			this.IsInitialized = true;
		}
	}

	public static Get(type: RequestType): IGameLaunchBase {
		switch (type) {
			case RequestType.RequestGame:
				/* We are requesting a game, if there is a game session existent already, use that. */
				return new RequestGame(GameLaunchFactory._response);
			case RequestType.RequestGameJob:
				/* We are requesting a game with an explicit gameID */
				return new RequestGameJob(GameLaunchFactory._response);
			case RequestType.CloudEdit:
				/* We are requesting a cloud edit session */
				return new CloudEdit(GameLaunchFactory._response);
			case RequestType.RequestFollowUser:
				/* We are following another user. */
				return new RequestFollowUser(GameLaunchFactory._response);
			case RequestType.RequestPlayWithParty:
				/* DEPRECATED */
				return new RequestPlayWithParty(GameLaunchFactory._response);
			case RequestType.RequestPrivateGame:
				/* We are joining a private game, use the PrivateGameFactory in Roblox.Platform.Assets.Places */
				return new RequestPrivateGame(GameLaunchFactory._response);
			default:
				/* Just in case it makes it past the request type check. */
				GameLaunchRequestProcessor.ReportISXError(GameLaunchFactory._response, 'Invalid request type');
				break;
		}
	}
}
