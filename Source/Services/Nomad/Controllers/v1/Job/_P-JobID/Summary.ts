import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		return response.status(200).send({
			JobID: 'sea-ark13',
			Namespace: 'default',
			Summary: { ark: { Queued: 23, Complete: 9321, Failed: 142, Running: 275, Starting: 11, Lost: 0 } },
			Children: { Pending: 0, Running: 0, Dead: 0 },
			CreateIndex: 30151,
			ModifyIndex: 32187,
		});
	},
};
