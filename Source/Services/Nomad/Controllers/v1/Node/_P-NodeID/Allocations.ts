import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		if (request.query && request.query.index && parseInt(request.query.index.toString()) > 1) return;
		return response.status(200).header({ 'X-Nomad-Index': 32228, 'X-Nomad-Knownleader': true, 'X-Nomad-Lastcontact': 0 }).send([]);
	},
};
