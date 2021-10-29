import { NextFunction, Request, Response } from 'express';

export default {
	method: 'all',
	func: async (request: Request, response: Response, next: NextFunction) => {
		return response.send({
			categories: [
				{
					mainCategory: {
						name: 'ARK6833C',
						identifier: 'ark_6833c0268436ecef3b50e55b72f34e5b',
						description: '6833c0268436ecef3b50e55b72f34e5b',
					},
					subCategories: [{ name: 'ARK0E55B', identifier: 'ark_1', description: '1' }],
				},
			],
			deviceTypes: [{ name: 'Pc', identifier: 'pc', description: 'The superior thing' }],
			customerServiceCharacterImageUrl: 'https://images.rbxcdn.com/6833c0268436ecef3b50e55b72f34e5b.png',
			submitFormUrl: '/support',
			usernameCheckUrl: null,
		});
	},
};
