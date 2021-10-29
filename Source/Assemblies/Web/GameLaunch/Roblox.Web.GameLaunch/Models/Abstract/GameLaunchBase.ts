import { Response } from 'express';
import { IGameLaunchBase, ReportDebatableErrorDelegate } from '../../Interfaces/IGameLaunchBase';
import { IGameLaunchRequestBase } from '../../Interfaces/IGameLaunchRequestBase';

export abstract class GameLaunchBase implements IGameLaunchBase {
	protected _response: Response;

	public constructor(response: Response) {
		this._response = response;
	}

	public abstract Invoke(request: IGameLaunchRequestBase, reportDebatableErrorDelegate: ReportDebatableErrorDelegate): bool;
}
