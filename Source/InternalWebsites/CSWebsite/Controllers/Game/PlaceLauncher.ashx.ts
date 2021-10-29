/*
	FileName: PlaceLauncher.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://assetgame.sitetest4.robloxlabs.com/game/PlaceLauncher.ashx, A wrapper of Join.ashx

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

export default {
	method: 'all',
	func: (_req: unknown, res: { send: (arg0: unknown) => void }): void => {
		const txt = {
			jobId: '00000000-0000-0000-0000-000000000000',
			status: 2,
			joinScriptUrl: 'https://broom.sitetest4.robloxlabs.com/Game/Join.ashx?placeId=1818',
			authenticationUrl: 'https://sitetest4.robloxlabs.com/Login/Negotiate.ashx',
			authenticationTicket: 'Guest:-3074',
		};
		res.send(txt);
	},
};
