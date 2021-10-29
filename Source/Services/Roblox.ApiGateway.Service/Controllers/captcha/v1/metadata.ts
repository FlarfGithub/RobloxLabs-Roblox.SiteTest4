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

export default {
	method: 'all',
	func: (_req, res): void => {
		return res.send({
			funCaptchaPublicKeys: {
				ACTION_TYPE_ASSET_COMMENT: '63E4117F-E727-42B4-6DAA-C8448E9B137F',
				ACTION_TYPE_CLOTHING_ASSET_UPLOAD: '63E4117F-E727-42B4-6DAA-C8448E9B137F',
				ACTION_TYPE_GROUP_JOIN: '63E4117F-E727-42B4-6DAA-C8448E9B137F',
				ACTION_TYPE_GROUP_WALL_POST: '63E4117F-E727-42B4-6DAA-C8448E9B137F',
				ACTION_TYPE_SUPPORT_REQUEST: '63E4117F-E727-42B4-6DAA-C8448E9B137F',
				ACTION_TYPE_WEB_GAMECARD_REDEMPTION: '1B154715-ACB4-2706-19ED-0DC7E3F7D855',
				ACTION_TYPE_WEB_LOGIN: '476068BF-9607-4799-B53D-966BE98E2B81',
				ACTION_TYPE_WEB_RESET_PASSWORD: '63E4117F-E727-42B4-6DAA-C8448E9B137F',
				ACTION_TYPE_WEB_SIGNUP: 'A2A14B1D-1AF3-C791-9BBC-EE33CC7A0A6F',
			},
		});
	},
};
