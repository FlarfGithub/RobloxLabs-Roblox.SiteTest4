import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		if (request.query && request.query.index && parseInt(request.query.index.toString()) > 1) return;

		return response
			.header({ 'X-Nomad-Index': 7, 'X-Nomad-Knownleader': true, 'X-Nomad-Lastcontact': 0 })
			.status(200)
			.send({
				ID: 'eac470d9-f866-16af-194a-ca70e8f71490',
				Namespace: 'default',
				JobID: 'sea-ark13',
				JobVersion: 2,
				JobModifyIndex: 285269,
				JobSpecModifyIndex: 285269,
				JobCreateIndex: 123032,
				IsMultiregion: false,
				TaskGroups: {
					ark: {
						AutoRevert: false,
						AutoPromote: false,
						ProgressDeadline: 600000000000,
						RequireProgressBy: '2021-05-04T03:40:52.166325706Z',
						Promoted: false,
						PlacedCanaries: null,
						DesiredCanaries: 0,
						DesiredTotal: 1,
						PlacedAllocs: 1,
						HealthyAllocs: 1,
						UnhealthyAllocs: 0,
					},
				},
				Status: 'successful',
				StatusDescription: 'Deployment completed successfully',
				CreateIndex: 285270,
				ModifyIndex: 285278,
			});
	},
};
