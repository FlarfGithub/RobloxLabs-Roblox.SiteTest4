import { User } from '../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/User';

export default {
	method: 'all',
	func: async (_req, res) => {
		const user = await User.Get(parseInt(_req.query.id) || 1);
		res.render('test', {
			uname: user.Name,
			uid: user.Id,
			dname: user.DisplayName,
			MACHINE_ID: 'AWA-1447',
			u13: !user.UserAbove13,
			pre: user.IsPremium,
			url: _req.url,
			code: 500,
			msg: 'Error when loading bundles',
			stack: new Error().stack,
			theme: 'dark-theme',
		});
	},
};
