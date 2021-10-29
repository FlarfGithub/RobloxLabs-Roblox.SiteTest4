import a from 'axios';

export default {
	method: 'all',
	func: async (_req, res) => {
		if (_req.method === 'OPTIONS') return res.send();
		a.post('https://api.roblox.com' + _req.url, _req.body, {
			headers: { ..._req.headers, host: 'api.roblox.com' },
		})
			.then((re) => {
				const newheaders = JSON.parse(JSON.stringify(re.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));

				return res.header(newheaders).send(re.data);
			})
			.catch((e) => {
				const newheaders = JSON.parse(JSON.stringify(e.response.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));
				return res.header(newheaders).status(e.response.status).send(e.response.data);
			});
	},
};
