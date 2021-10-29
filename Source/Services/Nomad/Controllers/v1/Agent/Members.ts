import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		return response.status(200).send({
			ServerName: 'base3-omv-eu-west.1223.arkcdn-grpc4',
			ServerRegion: 'eu-west-1223',
			ServerDC: 'nomad',
			Members: [
				{
					Name: 'base3-omv-eu-west.1223.arkcdn-grpc4',
					Addr: '10.106.0.2',
					Port: 4648,
					Tags: {
						region: 'eu-west-1223',
						dc: 'ark-1773.eu-west',
						mvn: '1',
						raft_vsn: '2',
						vsn: '1',
						build: '1.0.4',
						rpc_addr: '10.106.0.2',
						role: 'nomad',
						id: '1d678bda-7190-40d7-3dce-019c6b41394b',
						port: '4647',
						expect: '3',
					},
					Status: 'alive',
					ProtocolMin: 1,
					ProtocolMax: 5,
					ProtocolCur: 2,
					DelegateMin: 2,
					DelegateMax: 5,
					DelegateCur: 4,
				},
			],
		});
	},
};
