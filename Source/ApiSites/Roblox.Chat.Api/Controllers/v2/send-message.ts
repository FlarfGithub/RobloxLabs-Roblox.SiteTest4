/*
	FileName: LoadPlaceInfo.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Load Place info script
			
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

import a from 'axios';
import evt from '../../../../Assemblies/Web/EventManager/Roblox.Web.EventManager/Notifications';

export default {
	method: 'all',
	func: async (_req, res) => {
		// evt.push(_req.body.conversationId);
		if (_req.method === 'OPTIONS') return res.send();
		a.get('https://assetgame.roblox.com/Game/GetCurrentUser.ashx', {
			headers: { Cookie: _req.headers.cookie },
		})
			.then((re2) => {
				console.log(re2.data);
				a.get('https://chat.roblox.com/v2/get-conversations?conversationIds=' + _req.body.conversationId, {
					headers: { Cookie: _req.headers.cookie },
				})
					.then((re) => {
						console.log(re.data);
						const ids = [];
						re.data[0].participants.forEach((element) => {
							console.log(element.targetId.toString() !== re2.data, element.targetId !== parseInt(re2.data));
							if (element.targetId !== parseInt(re2.data)) ids.push(element.targetId);
						});
						console.log(ids);
						evt.push(_req.headers.cookie, _req.body.conversationId, ids);
					})
					.catch((e) => {
						evt.push(_req.headers.cookie, null, null);
					});
			})
			.catch((e) => {
				evt.push(_req.headers.cookie, null, null);
			});
		a.post('https://chat.roblox.com' + _req.url, _req.body, {
			headers: { ..._req.headers, host: 'chat.roblox.com' },
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
