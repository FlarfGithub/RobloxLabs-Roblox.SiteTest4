import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		return response.status(200).send([
			{
				ID: '8a760614-d54c-63f9-5ac8-2c3460fa0a16',
				Namespace: 'default',
				Priority: 50,
				Type: 'service',
				TriggeredBy: 'job-register',
				JobID: 'sea-ark13',
				JobModifyIndex: 285269,
				DeploymentID: 'eac470d9-f866-16af-194a-ca70e8f71490',
				Status: 'running',
				QueuedAllocations: { ark: 0 },
				SnapshotIndex: 285269,
				CreateIndex: 285269,
				ModifyIndex: 285271,
				CreateTime: 1620099029128501601,
				ModifyTime: 1620099029146328062,
			},
		]);
	},
};
