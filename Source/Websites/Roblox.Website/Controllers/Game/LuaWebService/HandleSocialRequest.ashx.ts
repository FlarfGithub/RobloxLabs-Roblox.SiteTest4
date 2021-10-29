/*
	FileName: HandleSocialRequest.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://assetgame.sitetest4.robloxlabs.com/game/LuaWebService/HandleSocialRequest.ashx, Handles SocialRequests, such as checking if users are friends with each other.

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

import { Request, Response } from 'express-serve-static-core';

export default {
	method: 'all',
	func: (req: Request, res: Response): void => {
		res.contentType('application/xml;charset=utf-8');
		switch (req.query.method) {
			case 'IsFriendsWith':
				res.send('<Value Type="boolean">false</Value>');
				break;
			case 'IsBestFriendsWith':
				res.send('<Value Type="boolean">false</Value>');
				break;
			case 'IsInGroup':
				res.send('<Value Type="boolean">true</Value>');
				break;
			case 'GetGroupRank':
				res.send('<Value Type="integer">100</Value>');
				break;
			case 'GetGroupRole':
				res.send('');
				break;
		}
	},
};
// SEC::<YES>,EXP::<2031-01-20T07:30:09Z>,COOK::<_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlYjY1Yjc0Zi1kZGFiLTRhNGItYTdlNy0zMWNkNDM3MDg5ZDUiLCJzdWIiOjY4MzQ5MTIwMX0.wAV4Xmo_a8nTnivQjo-_xwJ9N9m5FjdoqmyecDNJXNk>
