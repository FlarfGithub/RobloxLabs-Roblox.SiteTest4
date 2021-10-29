import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		if (request.query && request.query.index && parseInt(request.query.index.toString()) > 1) return;

		return response
			.status(200)
			.header({ 'X-Nomad-Index': 32225, 'X-Nomad-Knownleader': true, 'X-Nomad-Lastcontact': 0 })
			.send([
				{
					ID: 'sea-ark13',
					ParentID: '',
					Name: 'sea-ark13',
					Namespace: 'default',
					Datacenters: ['ark-1773.eu-west'],
					Multiregion: null,
					Type: 'service',
					Priority: 50,
					Periodic: false,
					ParameterizedJob: false,
					Stop: false,
					Status: 'running',
					StatusDescription: '',
					JobSummary: {
						JobID: 'sea-ark13',
						Namespace: 'default',
						Summary: { ark: { Queued: 23, Complete: 9321, Failed: 142, Running: 275, Starting: 11, Lost: 0 } },
						Children: { Pending: 0, Running: 0, Dead: 0 },
						CreateIndex: 30151,
						ModifyIndex: 32187,
					},
					CreateIndex: 30151,
					ModifyIndex: 32187,
					JobModifyIndex: 30151,
					SubmitTime: 1621624318254539694,
				},
			]);
	},
};
