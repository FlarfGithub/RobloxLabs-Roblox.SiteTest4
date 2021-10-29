const e = {
	error: 0,
	msg: 'Success',
	result: [
		{
			CREATETIME: '2020-12-05 00:44:10',
			CREATORID: 0,
			ID: 70,
			RSTATUS: 1,
			STATBEGIN: '2020-11-14 08:00:00',
			STATCOUNT: 64028,
			STATEND: '2020-11-20 08:00:00',
			UPDATETIME: '2020-12-05 00:48:17',
		},
	],
};
import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		response.send(e);
	},
};
