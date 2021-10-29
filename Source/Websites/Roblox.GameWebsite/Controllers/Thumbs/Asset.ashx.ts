/*
	FileName: Asset.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://assetgame.sitetest4.robloxlabs.com/Thumbs/Asset.ashx, return a thumbnail for the given assetId

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
	func: async (_req, res) => {
		if (_req.query.assetId === '1') {
			return res.redirect('http://t4.rbxcdn.com/1b363623ff82fb69c03cb99d0825bd1e');
		}
		return res.redirect('https://assetgame.roblox.com' + _req.url);
	},
};
