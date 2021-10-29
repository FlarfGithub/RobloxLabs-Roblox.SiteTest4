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
			data: [
				{
					locale: {
						id: 1,
						locale: 'en_us',
						name: 'English(US)',
						nativeName: 'English',
						language: { id: 41, name: 'English', nativeName: 'English', languageCode: 'en' },
					},
					isEnabledForFullExperience: true,
					isEnabledForSignupAndLogin: true,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 2,
						locale: 'es_es',
						name: 'Spanish(Spain)',
						nativeName: 'Español',
						language: { id: 148, name: 'Spanish', nativeName: 'Español', languageCode: 'es' },
					},
					isEnabledForFullExperience: true,
					isEnabledForSignupAndLogin: true,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 3,
						locale: 'fr_fr',
						name: 'French',
						nativeName: 'Français',
						language: { id: 48, name: 'French', nativeName: 'Français', languageCode: 'fr' },
					},
					isEnabledForFullExperience: true,
					isEnabledForSignupAndLogin: true,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 4,
						locale: 'id_id',
						name: 'Indonesian',
						nativeName: 'Bahasa Indonesia',
						language: { id: 64, name: 'Indonesian', nativeName: 'Bahasa Indonesia', languageCode: 'id' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 5,
						locale: 'it_it',
						name: 'Italian',
						nativeName: 'Italiano',
						language: { id: 71, name: 'Italian', nativeName: 'Italiano', languageCode: 'it' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 6,
						locale: 'ja_jp',
						name: 'Japanese',
						nativeName: '日本語',
						language: { id: 73, name: 'Japanese', nativeName: '日本語 (にほんご),', languageCode: 'ja' },
					},
					isEnabledForFullExperience: true,
					isEnabledForSignupAndLogin: true,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 7,
						locale: 'ko_kr',
						name: 'Korean',
						nativeName: '한국어',
						language: { id: 86, name: 'Korean', nativeName: '한국어', languageCode: 'ko' },
					},
					isEnabledForFullExperience: true,
					isEnabledForSignupAndLogin: true,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 8,
						locale: 'ru_ru',
						name: 'Russian',
						nativeName: 'Русский',
						language: { id: 133, name: 'Russian', nativeName: 'Русский', languageCode: 'ru' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 9,
						locale: 'th_th',
						name: 'Thai',
						nativeName: 'ภาษาไทย',
						language: { id: 156, name: 'Thai', nativeName: 'ไทย', languageCode: 'th' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 10,
						locale: 'tr_tr',
						name: 'Turkish',
						nativeName: 'Türkçe',
						language: { id: 163, name: 'Turkish', nativeName: 'Türkçe', languageCode: 'tr' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 11,
						locale: 'vi_vn',
						name: 'Vietnamese',
						nativeName: 'Tiếng Việt',
						language: { id: 173, name: 'Vietnamese', nativeName: 'Tiếng Việt', languageCode: 'vi' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 12,
						locale: 'pt_br',
						name: 'Portuguese (Brazil)',
						nativeName: 'Português (Brasil)',
						language: { id: 128, name: 'Portuguese', nativeName: 'Português', languageCode: 'pt' },
					},
					isEnabledForFullExperience: true,
					isEnabledForSignupAndLogin: true,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 13,
						locale: 'de_de',
						name: 'German',
						nativeName: 'Deutsch',
						language: { id: 52, name: 'German', nativeName: 'Deutsch', languageCode: 'de' },
					},
					isEnabledForFullExperience: true,
					isEnabledForSignupAndLogin: true,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 14,
						locale: 'zh_cn',
						name: 'Chinese (Simplified)',
						nativeName: '中文(简体)',
						language: { id: 30, name: 'Chinese (Simplified)', nativeName: '简体中文', languageCode: 'zh-hans' },
					},
					isEnabledForFullExperience: true,
					isEnabledForSignupAndLogin: true,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 15,
						locale: 'zh_tw',
						name: 'Chinese (Traditional)',
						nativeName: '中文(繁體)',
						language: { id: 189, name: 'Chinese (Traditional)', nativeName: '繁體中文', languageCode: 'zh-hant' },
					},
					isEnabledForFullExperience: true,
					isEnabledForSignupAndLogin: true,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 16,
						locale: 'bg_bg',
						name: 'Bulgarian',
						nativeName: 'Български',
						language: { id: 24, name: 'Bulgarian', nativeName: 'български език', languageCode: 'bg' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 17,
						locale: 'bn_bd',
						name: 'Bengali',
						nativeName: 'বাংলা',
						language: { id: 19, name: 'Bengali', nativeName: 'বাংলা', languageCode: 'bn' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 18,
						locale: 'cs_cz',
						name: 'Czech',
						nativeName: 'Čeština',
						language: { id: 36, name: 'Czech', nativeName: 'čeština', languageCode: 'cs' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 19,
						locale: 'da_dk',
						name: 'Danish',
						nativeName: 'Dansk',
						language: { id: 37, name: 'Danish', nativeName: 'dansk', languageCode: 'da' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 20,
						locale: 'el_gr',
						name: 'Greek',
						nativeName: 'Ελληνικά',
						language: { id: 53, name: 'Greek', nativeName: 'ελληνικά', languageCode: 'el' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 21,
						locale: 'et_ee',
						name: 'Estonian',
						nativeName: 'Eesti',
						language: { id: 43, name: 'Estonian', nativeName: 'eesti, eesti keel', languageCode: 'et' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 22,
						locale: 'fi_fi',
						name: 'Finnish',
						nativeName: 'Suomi',
						language: { id: 47, name: 'Finnish', nativeName: 'suomi', languageCode: 'fi' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 23,
						locale: 'hi_in',
						name: 'Hindi',
						nativeName: 'हिन्दी',
						language: { id: 60, name: 'Hindi', nativeName: 'हिन्दी, हिंदी', languageCode: 'hi' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 24,
						locale: 'hr_hr',
						name: 'Croatian',
						nativeName: 'Hrvatski',
						language: { id: 35, name: 'Croatian', nativeName: 'hrvatski jezik', languageCode: 'hr' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 25,
						locale: 'hu_hu',
						name: 'Hungarian',
						nativeName: 'Magyar',
						language: { id: 62, name: 'Hungarian', nativeName: 'magyar', languageCode: 'hu' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 26,
						locale: 'ka_ge',
						name: 'Georgian',
						nativeName: 'ქართული',
						language: { id: 51, name: 'Georgian', nativeName: 'ქართული', languageCode: 'ka' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 27,
						locale: 'kk_kz',
						name: 'Kazakh',
						nativeName: 'Қазақ Тілі',
						language: { id: 79, name: 'Kazakh', nativeName: 'қазақ тілі', languageCode: 'kk' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 28,
						locale: 'km_kh',
						name: 'Khmer',
						nativeName: 'ភាសាខ្មែរ',
						language: { id: 188, name: 'Khmer', nativeName: 'ភាសាខ្មែរ', languageCode: 'km' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 29,
						locale: 'lt_lt',
						name: 'Lithuanian',
						nativeName: 'Lietuvių',
						language: { id: 95, name: 'Lithuanian', nativeName: 'lietuvių kalba', languageCode: 'lt' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 30,
						locale: 'lv_lv',
						name: 'Latvian',
						nativeName: 'Latviešu',
						language: { id: 97, name: 'Latvian', nativeName: 'Latviešu Valoda', languageCode: 'lv' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 31,
						locale: 'ms_my',
						name: 'Malay',
						nativeName: 'Bahasa Melayu',
						language: { id: 101, name: 'Malay', nativeName: 'بهاس ملايو‎', languageCode: 'ms' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 32,
						locale: 'my_mm',
						name: 'Burmese',
						nativeName: 'ဗမာစာ',
						language: { id: 25, name: 'Burmese', nativeName: 'ဗမာစာ', languageCode: 'my' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 33,
						locale: 'nb_no',
						name: 'Bokmal',
						nativeName: 'Bokmål',
						language: { id: 113, name: 'Bokmal', nativeName: 'Norsk Bokmål', languageCode: 'nb' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 34,
						locale: 'nl_nl',
						name: 'Dutch',
						nativeName: 'Nederlands',
						language: { id: 39, name: 'Dutch', nativeName: 'Nederlands', languageCode: 'nl' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 35,
						locale: 'fil_ph',
						name: 'Filipino',
						nativeName: 'Filipino',
						language: { id: 190, name: 'Filipino', nativeName: 'Filipino', languageCode: 'fil' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 36,
						locale: 'pl_pl',
						name: 'Polish',
						nativeName: 'Polski',
						language: { id: 126, name: 'Polish', nativeName: 'Język Polski', languageCode: 'pl' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 37,
						locale: 'ro_ro',
						name: 'Romanian',
						nativeName: 'Română',
						language: { id: 132, name: 'Romanian', nativeName: 'Română', languageCode: 'ro' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 38,
						locale: 'uk_ua',
						name: 'Ukrainian',
						nativeName: 'Yкраїньска',
						language: { id: 169, name: 'Ukrainian', nativeName: 'Українська', languageCode: 'uk' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 39,
						locale: 'si_lk',
						name: 'Sinhala',
						nativeName: 'සිංහල',
						language: { id: 143, name: 'Sinhala', nativeName: 'සිංහල', languageCode: 'si' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 40,
						locale: 'sk_sk',
						name: 'Slovak',
						nativeName: 'Slovenčina',
						language: { id: 144, name: 'Slovak', nativeName: 'Slovenčina', languageCode: 'sk' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 41,
						locale: 'sl_sl',
						name: 'Slovenian',
						nativeName: 'Slovenski',
						language: { id: 145, name: 'Slovenian', nativeName: 'Slovenščina', languageCode: 'sl' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 42,
						locale: 'sq_al',
						name: 'Albanian',
						nativeName: 'Shqipe',
						language: { id: 5, name: 'Albanian', nativeName: 'Shqip', languageCode: 'sq' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 43,
						locale: 'bs_ba',
						name: 'Bosnian',
						nativeName: 'Босански',
						language: { id: 22, name: 'Bosnian', nativeName: 'bosanski jezik', languageCode: 'bs' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 44,
						locale: 'sr_rs',
						name: 'Serbian',
						nativeName: 'Cрпски',
						language: { id: 140, name: 'Serbian', nativeName: 'српски језик', languageCode: 'sr' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
				{
					locale: {
						id: 45,
						locale: 'sv_se',
						name: 'Swedish',
						nativeName: 'Svenska',
						language: { id: 152, name: 'Swedish', nativeName: 'Svenska', languageCode: 'sv' },
					},
					isEnabledForFullExperience: false,
					isEnabledForSignupAndLogin: false,
					isEnabledForInGameUgc: true,
				},
			],
		});
	},
};
