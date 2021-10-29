/*
	FileName: asset.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://www.sitetest4.robloxlabs.com/asset/, Redirects to assetdelivery

	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

// import { Roblox } from '../../../../Roblox.Api';
// import fs from 'fs';
import a from 'axios';

export default {
	method: 'all',
	func: (req, res): void => {
		a.get(`https://www.roblox.com/my/messages`, { headers: { ...req.headers, host: 'www.roblox.com' } })
			.then((re) => {
				const newbody = re.data.split('roblox.com').join('sitetest4.robloxlabs.com');
				const newheaders = JSON.parse(JSON.stringify(re.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));

				return res.header(newheaders).send(newbody);
			})
			.catch((e) => {
				const newheaders = JSON.parse(JSON.stringify(e.response.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));
				return res.header(newheaders).status(e.response.status).send(e.response.data);
			});
		// let template = fs.readFileSync(
		// 	Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + '/InternalCDN/Roblox.UserProfile.html',
		// 	{ encoding: 'utf-8' },
		// );
		// template = template.split('<USERIDHERE>').join(userId.toString());
		// return res.send(template);
	},
};
