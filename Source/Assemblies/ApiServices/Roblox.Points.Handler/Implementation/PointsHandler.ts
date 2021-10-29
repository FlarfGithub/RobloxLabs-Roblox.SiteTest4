import { Response } from 'express';
import { IUser } from '../../../Platform/Membership/Roblox.Platform.Membership/IUser';
import { IUniverse } from '../../../Platform/Universes/Roblox.Platform.Universes/IUniverse';

export class PointsHandler {
	private _response: Response;

	public constructor(response: Response) {
		this._response = response;
	}

	public HandleGetAllTimePoints(user: IUser, universe: IUniverse) {
		// Just make this do nothing for the time being; aka. echo back the user and universe, with an alltimescore of 0
		return this._response.status(200).send({ IUser: user, IUniverse: universe, allTimeScore: 0 });
	}
}
