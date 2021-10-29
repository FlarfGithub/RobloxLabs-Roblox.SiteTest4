import { Response } from 'express';
import { ReportDebatableErrorDelegate } from '../Interfaces/IGameLaunchBase';
import { IGameLaunchRequestBase } from '../Interfaces/IGameLaunchRequestBase';
import { GameLaunchBase } from '../Models/Abstract/GameLaunchBase';

export class RequestPrivateGame extends GameLaunchBase {
	public constructor(response: Response) {
		super(response);
	}

	public Invoke(request: IGameLaunchRequestBase, reportDebatableErrorDelegate: ReportDebatableErrorDelegate): bool {
		throw new Error('Method not implemented.');
	}
}
