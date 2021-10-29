import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (request: Request, response: Response<string>) => {
		response.send(`<Value Type="boolean">true</Value>`);
	},
};
