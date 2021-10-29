/*
	FileName: Join.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://assetgame.sitetest4.robloxlabs.com/game/Join.ashx, gets join information for the RakPeer in order to connect to that peer.

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

import { Request, Response } from 'express';
import { DFString, DYNAMIC_FASTSTRINGVARIABLE } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { DateTimeConverter } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Converters/DateTimeConverter';
import { HashingClient } from '../../../../Assemblies/Data/Hashing/Roblox.Data.Hashing/HashingClient';

DYNAMIC_FASTSTRINGVARIABLE('CharacterAppearanceUrl', 'http://assetgame.sitetest4.robloxlabs.com/Asset/CharacterFetch.ashx');

export default {
	method: 'all',
	func: (request: Request, response: Response): void => {
		const hashClient = new HashingClient(response);
		const date = DateTimeConverter.DateToLocaleDate(new Date(Date.now()));
		const txt = {
			ClientPort: 0,
			MachineAddress: request.query['IpAddress'] || '127.0.0.1',
			ServerPort: parseInt(<string>request.query['port']) || 53640,
			PingUrl: '',
			PingInterval: 120,
			UserName: request.query['username'] || 'Default',
			SeleniumTestMode: false,
			UserId: parseInt(<string>request.query['userId']) || 1,
			RobloxLocale: 'en_us',
			GameLocale: 'en_us',
			SuperSafeChat: false,
			CharacterAppearance: DFString('CharacterAppearanceUrl'),
			ClientTicket: `${date};${HashingClient.GetSignedData(
				`${parseInt(<string>request.query['userId']) || 1}\n${request.query['username'] || 'Default'}\n${DFString(
					'CharacterAppearanceUrl',
				)}\n00000000-0000-0000-0000-000000000000\n${date}`,
			)};${HashingClient.GetSignedData(
				`${parseInt(<string>request.query['userId']) || 1}\n00000000-0000-0000-0000-000000000000\n${date}`,
			)}`,
			GameId: '00000000-0000-0000-0000-000000000000',
			PlaceId: parseInt(<string>request.query['placeId']) || 1,
			MeasurementUrl: '',
			WaitingForCharacterGuid: '00000000-0000-0000-0000-000000000000',
			BaseUrl: 'http://www.sitetest4.robloxlabs.com/',
			ChatStyle: 'Classic',
			VendorId: 0,
			ScreenShotInfo: '',
			VideoInfo: '',
			CreatorId: 0,
			CreatorTypeEnum: 'User',
			MembershipType: 'OutrageousBuildersClub',
			AccountAge: 0,
			CookieStoreFirstTimePlayKey: 'rbx_evt_ftp',
			CookieStoreFiveMinutePlayKey: 'rbx_evt_fmp',
			CookieStoreEnabled: true,
			IsRobloxPlace: request.query['IsRobloxPlace'] ? true : false,
			GenerateTeleportJoin: false,
			IsUnknownOrUnder13: false,
			GameChatType: 'NoOne',
			SessionId: '',
			AnalyticsSessionId: '00000000-0000-0000-0000-000000000000',
			DataCenterId: 0,
			UniverseId: 0,
			BrowserTrackerId: 0,
			UsePortraitMode: false,
			characterAppearanceId: 0,
			CountryCode: 'US',
		};
		return hashClient.SendSignedResponse(JSON.stringify(txt));
	},
};
