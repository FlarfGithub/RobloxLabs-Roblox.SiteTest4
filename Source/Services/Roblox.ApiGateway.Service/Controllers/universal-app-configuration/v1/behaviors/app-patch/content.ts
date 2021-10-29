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
			SchemaVersion: '1',
			CanaryUserIds: [
				'1414155294',
				'789649359',
				'1554218448',
				'1183108143',
				'1233329274',
				'1778901561',
				'1778232921',
				'1778243043',
				'1778246770',
				'1778247848',
				'1777078367',
				'1765344107',
				'1775683199',
				'1775689354',
				'1775692594',
				'1775695227',
				'1775697675',
				'1775699944',
				'1771104088',
				'1769918369',
				'1793937071',
				'1793939930',
				'1793941574',
				'1792775594',
				'1792779320',
				'1794057197',
				'1801978113',
				'1801984378',
				'1801977170',
				'1801981001',
				'1801983193',
				'1801745827',
				'1801749237',
				'1801751748',
				'1815693733',
				'1815698605',
				'873860677',
			],
			CanaryPercentage: 0,
		});
	},
};
