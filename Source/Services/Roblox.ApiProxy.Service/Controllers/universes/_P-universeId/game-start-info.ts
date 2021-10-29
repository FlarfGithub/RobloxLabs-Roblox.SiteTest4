import { Request, Response } from 'express';

export default {
	method: 'all',
	func: (_request: Request, response: Response): void => {
		response.status(200).send({ r15Morphing: false });
	},
};
