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
			supportedLocales: [
				{
					id: 13,
					locale: 'de_de',
					name: 'German',
					nativeName: 'Deutsch',
					language: {
						id: 52,
						name: 'German',
						nativeName: 'Deutsch',
						languageCode: 'de',
					},
				},
				{
					id: 1,
					locale: 'en_us',
					name: 'English(US)',
					nativeName: 'English',
					language: {
						id: 41,
						name: 'English',
						nativeName: 'English',
						languageCode: 'en',
					},
				},
				{
					id: 2,
					locale: 'es_es',
					name: 'Spanish(Spain)',
					nativeName: 'Español',
					language: {
						id: 148,
						name: 'Spanish',
						nativeName: 'Español',
						languageCode: 'es',
					},
				},
				{
					id: 3,
					locale: 'fr_fr',
					name: 'French',
					nativeName: 'Français',
					language: {
						id: 48,
						name: 'French',
						nativeName: 'Français',
						languageCode: 'fr',
					},
				},
				{
					id: 12,
					locale: 'pt_br',
					name: 'Portuguese (Brazil)',
					nativeName: 'Português (Brasil)',
					language: {
						id: 128,
						name: 'Portuguese',
						nativeName: 'Português',
						languageCode: 'pt',
					},
				},
				{
					id: 7,
					locale: 'ko_kr',
					name: 'Korean',
					nativeName: '한국어',
					language: {
						id: 86,
						name: 'Korean',
						nativeName: '한국어',
						languageCode: 'ko',
					},
				},
				{
					id: 14,
					locale: 'zh_cn',
					name: 'Chinese (Simplified)',
					nativeName: '中文(简体)',
					language: {
						id: 30,
						name: 'Chinese (Simplified)',
						nativeName: '简体中文',
						languageCode: 'zh-hans',
					},
				},
				{
					id: 15,
					locale: 'zh_tw',
					name: 'Chinese (Traditional)',
					nativeName: '中文(繁體)',
					language: {
						id: 189,
						name: 'Chinese (Traditional)',
						nativeName: '繁體中文',
						languageCode: 'zh-hant',
					},
				},
				{
					id: 6,
					locale: 'ja_jp',
					name: 'Japanese',
					nativeName: '日本語',
					language: {
						id: 73,
						name: 'Japanese',
						nativeName: '日本語 (にほんご),',
						languageCode: 'ja',
					},
				},
			],
		});
	},
};
