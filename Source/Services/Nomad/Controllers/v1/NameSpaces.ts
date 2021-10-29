import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		return response.status(200).send([
			{
				Name: 'default',
				Description: 'Default shared namespace',
				Quota: '',
				Hash: 'C7UbjDwBK0dK8wQq7Izg7SJIzaV+lIo2X7wRtzY3pSw=',
				CreateIndex: 1,
				ModifyIndex: 1,
			},
		]);
	},
};
