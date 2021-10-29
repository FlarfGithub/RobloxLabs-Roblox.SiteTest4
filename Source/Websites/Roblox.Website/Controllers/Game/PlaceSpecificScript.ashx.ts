import { Request, Response } from 'express';
import { HashingClient } from '../../../../Assemblies/Data/Hashing/Roblox.Data.Hashing/HashingClient';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		const hashClient = new HashingClient(response);

		hashClient.SendSignedResponse('');
	},
};
