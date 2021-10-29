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
			countryRegionList: [
				{
					code: 'AF',
					name: 'Afghanistan',
					displayName: 'Afghanistan',
				},
				{
					code: 'AX',
					name: 'Aland Islands',
					displayName: 'Aland Islands',
				},
				{
					code: 'AL',
					name: 'Albania',
					displayName: 'Albania',
				},
				{
					code: 'DZ',
					name: 'Algeria',
					displayName: 'Algeria',
				},
				{
					code: 'AS',
					name: 'American Samoa',
					displayName: 'American Samoa',
				},
				{
					code: 'AD',
					name: 'Andorra',
					displayName: 'Andorra',
				},
				{
					code: 'AO',
					name: 'Angola',
					displayName: 'Angola',
				},
				{
					code: 'AI',
					name: 'Anguilla',
					displayName: 'Anguilla',
				},
				{
					code: 'AQ',
					name: 'Antarctica',
					displayName: 'Antarctica',
				},
				{
					code: 'AG',
					name: 'Antigua and Barbuda',
					displayName: 'Antigua and Barbuda',
				},
				{
					code: 'AR',
					name: 'Argentina',
					displayName: 'Argentina',
				},
				{
					code: 'AM',
					name: 'Armenia',
					displayName: 'Armenia',
				},
				{
					code: 'AW',
					name: 'Aruba',
					displayName: 'Aruba',
				},
				{
					code: 'AU',
					name: 'Australia',
					displayName: 'Australia',
				},
				{
					code: 'AT',
					name: 'Austria',
					displayName: 'Austria',
				},
				{
					code: 'AZ',
					name: 'Azerbaijan',
					displayName: 'Azerbaijan',
				},
				{
					code: 'BS',
					name: 'Bahamas, The',
					displayName: 'Bahamas, The',
				},
				{
					code: 'BH',
					name: 'Bahrain',
					displayName: 'Bahrain',
				},
				{
					code: 'BD',
					name: 'Bangladesh',
					displayName: 'Bangladesh',
				},
				{
					code: 'BB',
					name: 'Barbados',
					displayName: 'Barbados',
				},
				{
					code: 'BY',
					name: 'Belarus',
					displayName: 'Belarus',
				},
				{
					code: 'BE',
					name: 'Belgium',
					displayName: 'Belgium',
				},
				{
					code: 'BZ',
					name: 'Belize',
					displayName: 'Belize',
				},
				{
					code: 'BJ',
					name: 'Benin',
					displayName: 'Benin',
				},
				{
					code: 'BM',
					name: 'Bermuda',
					displayName: 'Bermuda',
				},
				{
					code: 'BT',
					name: 'Bhutan',
					displayName: 'Bhutan',
				},
				{
					code: 'BO',
					name: 'Bolivia',
					displayName: 'Bolivia',
				},
				{
					code: 'BQ',
					name: 'Bonaire, Saint Eustatius and Saba',
					displayName: 'Bonaire, Saint Eustatius and Saba',
				},
				{
					code: 'BA',
					name: 'Bosnia and Herzegovina',
					displayName: 'Bosnia and Herzegovina',
				},
				{
					code: 'BW',
					name: 'Botswana',
					displayName: 'Botswana',
				},
				{
					code: 'BV',
					name: 'Bouvet Island',
					displayName: 'Bouvet Island',
				},
				{
					code: 'BR',
					name: 'Brazil',
					displayName: 'Brazil',
				},
				{
					code: 'IO',
					name: 'British Indian Ocean Territory',
					displayName: 'British Indian Ocean Territory',
				},
				{
					code: 'BN',
					name: 'Brunei Darussalam',
					displayName: 'Brunei Darussalam',
				},
				{
					code: 'BG',
					name: 'Bulgaria',
					displayName: 'Bulgaria',
				},
				{
					code: 'BF',
					name: 'Burkina Faso',
					displayName: 'Burkina Faso',
				},
				{
					code: 'BI',
					name: 'Burundi',
					displayName: 'Burundi',
				},
				{
					code: 'KH',
					name: 'Cambodia',
					displayName: 'Cambodia',
				},
				{
					code: 'CM',
					name: 'Cameroon',
					displayName: 'Cameroon',
				},
				{
					code: 'CA',
					name: 'Canada',
					displayName: 'Canada',
				},
				{
					code: 'CV',
					name: 'Cape Verde',
					displayName: 'Cape Verde',
				},
				{
					code: 'KY',
					name: 'Cayman Islands',
					displayName: 'Cayman Islands',
				},
				{
					code: 'CF',
					name: 'Central African Republic',
					displayName: 'Central African Republic',
				},
				{
					code: 'TD',
					name: 'Chad',
					displayName: 'Chad',
				},
				{
					code: 'CL',
					name: 'Chile',
					displayName: 'Chile',
				},
				{
					code: 'CN',
					name: 'China',
					displayName: 'China',
				},
				{
					code: 'C2',
					name: 'China - Global App',
					displayName: 'China - Global App',
				},
				{
					code: 'CX',
					name: 'Christmas Island',
					displayName: 'Christmas Island',
				},
				{
					code: 'CC',
					name: 'Cocos (Keeling) Islands',
					displayName: 'Cocos (Keeling) Islands',
				},
				{
					code: 'CO',
					name: 'Colombia',
					displayName: 'Colombia',
				},
				{
					code: 'KM',
					name: 'Comoros',
					displayName: 'Comoros',
				},
				{
					code: 'CG',
					name: 'Congo',
					displayName: 'Congo',
				},
				{
					code: 'CD',
					name: 'Congo, The Democratic Republic of the',
					displayName: 'Congo, The Democratic Republic of the',
				},
				{
					code: 'CK',
					name: 'Cook Islands',
					displayName: 'Cook Islands',
				},
				{
					code: 'CR',
					name: 'Costa Rica',
					displayName: 'Costa Rica',
				},
				{
					code: 'CI',
					name: "Cote D'ivoire",
					displayName: "Cote D'ivoire",
				},
				{
					code: 'HR',
					name: 'Croatia',
					displayName: 'Croatia',
				},
				{
					code: 'CU',
					name: 'Cuba',
					displayName: 'Cuba',
				},
				{
					code: 'CW',
					name: 'Curaçao',
					displayName: 'Curaçao',
				},
				{
					code: 'CY',
					name: 'Cyprus',
					displayName: 'Cyprus',
				},
				{
					code: 'CZ',
					name: 'Czech Republic',
					displayName: 'Czech Republic',
				},
				{
					code: 'DK',
					name: 'Denmark',
					displayName: 'Denmark',
				},
				{
					code: 'DJ',
					name: 'Djibouti',
					displayName: 'Djibouti',
				},
				{
					code: 'DM',
					name: 'Dominica',
					displayName: 'Dominica',
				},
				{
					code: 'DO',
					name: 'Dominican Republic',
					displayName: 'Dominican Republic',
				},
				{
					code: 'EC',
					name: 'Ecuador',
					displayName: 'Ecuador',
				},
				{
					code: 'EG',
					name: 'Egypt',
					displayName: 'Egypt',
				},
				{
					code: 'SV',
					name: 'El Salvador',
					displayName: 'El Salvador',
				},
				{
					code: 'GQ',
					name: 'Equatorial Guinea',
					displayName: 'Equatorial Guinea',
				},
				{
					code: 'ER',
					name: 'Eritrea',
					displayName: 'Eritrea',
				},
				{
					code: 'EE',
					name: 'Estonia',
					displayName: 'Estonia',
				},
				{
					code: 'ET',
					name: 'Ethiopia',
					displayName: 'Ethiopia',
				},
				{
					code: 'FK',
					name: 'Falkland Islands (Malvinas)',
					displayName: 'Falkland Islands (Malvinas)',
				},
				{
					code: 'FO',
					name: 'Faroe Islands',
					displayName: 'Faroe Islands',
				},
				{
					code: 'FJ',
					name: 'Fiji',
					displayName: 'Fiji',
				},
				{
					code: 'FI',
					name: 'Finland',
					displayName: 'Finland',
				},
				{
					code: 'FR',
					name: 'France',
					displayName: 'France',
				},
				{
					code: 'GF',
					name: 'French Guiana',
					displayName: 'French Guiana',
				},
				{
					code: 'PF',
					name: 'French Polynesia',
					displayName: 'French Polynesia',
				},
				{
					code: 'TF',
					name: 'French Southern Territories',
					displayName: 'French Southern Territories',
				},
				{
					code: 'GA',
					name: 'Gabon',
					displayName: 'Gabon',
				},
				{
					code: 'GM',
					name: 'Gambia, The',
					displayName: 'Gambia, The',
				},
				{
					code: 'GE',
					name: 'Georgia',
					displayName: 'Georgia',
				},
				{
					code: 'DE',
					name: 'Germany',
					displayName: 'Germany',
				},
				{
					code: 'GH',
					name: 'Ghana',
					displayName: 'Ghana',
				},
				{
					code: 'GI',
					name: 'Gibraltar',
					displayName: 'Gibraltar',
				},
				{
					code: 'GR',
					name: 'Greece',
					displayName: 'Greece',
				},
				{
					code: 'GL',
					name: 'Greenland',
					displayName: 'Greenland',
				},
				{
					code: 'GD',
					name: 'Grenada',
					displayName: 'Grenada',
				},
				{
					code: 'GP',
					name: 'Guadeloupe',
					displayName: 'Guadeloupe',
				},
				{
					code: 'GU',
					name: 'Guam',
					displayName: 'Guam',
				},
				{
					code: 'GT',
					name: 'Guatemala',
					displayName: 'Guatemala',
				},
				{
					code: 'GG',
					name: 'Guernsey',
					displayName: 'Guernsey',
				},
				{
					code: 'GN',
					name: 'Guinea',
					displayName: 'Guinea',
				},
				{
					code: 'GW',
					name: 'Guinea-Bissau',
					displayName: 'Guinea-Bissau',
				},
				{
					code: 'GY',
					name: 'Guyana',
					displayName: 'Guyana',
				},
				{
					code: 'HT',
					name: 'Haiti',
					displayName: 'Haiti',
				},
				{
					code: 'HM',
					name: 'Heard Island and the McDonald Islands',
					displayName: 'Heard Island and the McDonald Islands',
				},
				{
					code: 'VA',
					name: 'Holy See',
					displayName: 'Holy See',
				},
				{
					code: 'HN',
					name: 'Honduras',
					displayName: 'Honduras',
				},
				{
					code: 'HK',
					name: 'Hong Kong',
					displayName: 'Hong Kong',
				},
				{
					code: 'HU',
					name: 'Hungary',
					displayName: 'Hungary',
				},
				{
					code: 'IS',
					name: 'Iceland',
					displayName: 'Iceland',
				},
				{
					code: 'IN',
					name: 'India',
					displayName: 'India',
				},
				{
					code: 'ID',
					name: 'Indonesia',
					displayName: 'Indonesia',
				},
				{
					code: 'IR',
					name: 'Iran',
					displayName: 'Iran',
				},
				{
					code: 'IQ',
					name: 'Iraq',
					displayName: 'Iraq',
				},
				{
					code: 'IE',
					name: 'Ireland',
					displayName: 'Ireland',
				},
				{
					code: 'IM',
					name: 'Isle of Man',
					displayName: 'Isle of Man',
				},
				{
					code: 'IL',
					name: 'Israel',
					displayName: 'Israel',
				},
				{
					code: 'IT',
					name: 'Italy',
					displayName: 'Italy',
				},
				{
					code: 'JM',
					name: 'Jamaica',
					displayName: 'Jamaica',
				},
				{
					code: 'JP',
					name: 'Japan',
					displayName: 'Japan',
				},
				{
					code: 'JE',
					name: 'Jersey',
					displayName: 'Jersey',
				},
				{
					code: 'JO',
					name: 'Jordan',
					displayName: 'Jordan',
				},
				{
					code: 'KZ',
					name: 'Kazakhstan',
					displayName: 'Kazakhstan',
				},
				{
					code: 'KE',
					name: 'Kenya',
					displayName: 'Kenya',
				},
				{
					code: 'KI',
					name: 'Kiribati',
					displayName: 'Kiribati',
				},
				{
					code: 'KR',
					name: 'Korea, Republic of',
					displayName: 'Korea, Republic of',
				},
				{
					code: 'KW',
					name: 'Kuwait',
					displayName: 'Kuwait',
				},
				{
					code: 'KG',
					name: 'Kyrgyzstan',
					displayName: 'Kyrgyzstan',
				},
				{
					code: 'LA',
					name: "Lao People's Democratic Republic",
					displayName: "Lao People's Democratic Republic",
				},
				{
					code: 'LV',
					name: 'Latvia',
					displayName: 'Latvia',
				},
				{
					code: 'LB',
					name: 'Lebanon',
					displayName: 'Lebanon',
				},
				{
					code: 'LS',
					name: 'Lesotho',
					displayName: 'Lesotho',
				},
				{
					code: 'LR',
					name: 'Liberia',
					displayName: 'Liberia',
				},
				{
					code: 'LY',
					name: 'Libya',
					displayName: 'Libya',
				},
				{
					code: 'LI',
					name: 'Liechtenstein',
					displayName: 'Liechtenstein',
				},
				{
					code: 'LT',
					name: 'Lithuania',
					displayName: 'Lithuania',
				},
				{
					code: 'LU',
					name: 'Luxembourg',
					displayName: 'Luxembourg',
				},
				{
					code: 'MO',
					name: 'Macao',
					displayName: 'Macao',
				},
				{
					code: 'MK',
					name: 'Macedonia, The Former Yugoslav Republic of',
					displayName: 'Macedonia, The Former Yugoslav Republic of',
				},
				{
					code: 'MG',
					name: 'Madagascar',
					displayName: 'Madagascar',
				},
				{
					code: 'MW',
					name: 'Malawi',
					displayName: 'Malawi',
				},
				{
					code: 'MY',
					name: 'Malaysia',
					displayName: 'Malaysia',
				},
				{
					code: 'MV',
					name: 'Maldives',
					displayName: 'Maldives',
				},
				{
					code: 'ML',
					name: 'Mali',
					displayName: 'Mali',
				},
				{
					code: 'MT',
					name: 'Malta',
					displayName: 'Malta',
				},
				{
					code: 'MH',
					name: 'Marshall Islands',
					displayName: 'Marshall Islands',
				},
				{
					code: 'MQ',
					name: 'Martinique',
					displayName: 'Martinique',
				},
				{
					code: 'MR',
					name: 'Mauritania',
					displayName: 'Mauritania',
				},
				{
					code: 'MU',
					name: 'Mauritius',
					displayName: 'Mauritius',
				},
				{
					code: 'YT',
					name: 'Mayotte',
					displayName: 'Mayotte',
				},
				{
					code: 'MX',
					name: 'Mexico',
					displayName: 'Mexico',
				},
				{
					code: 'FM',
					name: 'Micronesia, Federated States of',
					displayName: 'Micronesia, Federated States of',
				},
				{
					code: 'MD',
					name: 'Moldova, Republic of',
					displayName: 'Moldova, Republic of',
				},
				{
					code: 'MC',
					name: 'Monaco',
					displayName: 'Monaco',
				},
				{
					code: 'MN',
					name: 'Mongolia',
					displayName: 'Mongolia',
				},
				{
					code: 'ME',
					name: 'Montenegro',
					displayName: 'Montenegro',
				},
				{
					code: 'MS',
					name: 'Montserrat',
					displayName: 'Montserrat',
				},
				{
					code: 'MA',
					name: 'Morocco',
					displayName: 'Morocco',
				},
				{
					code: 'MZ',
					name: 'Mozambique',
					displayName: 'Mozambique',
				},
				{
					code: 'MM',
					name: 'Myanmar',
					displayName: 'Myanmar',
				},
				{
					code: 'NA',
					name: 'Namibia',
					displayName: 'Namibia',
				},
				{
					code: 'NR',
					name: 'Nauru',
					displayName: 'Nauru',
				},
				{
					code: 'NP',
					name: 'Nepal',
					displayName: 'Nepal',
				},
				{
					code: 'NL',
					name: 'Netherlands',
					displayName: 'Netherlands',
				},
				{
					code: 'AN',
					name: 'Netherlands Antilles',
					displayName: 'Netherlands Antilles',
				},
				{
					code: 'NC',
					name: 'New Caledonia',
					displayName: 'New Caledonia',
				},
				{
					code: 'NZ',
					name: 'New Zealand',
					displayName: 'New Zealand',
				},
				{
					code: 'NI',
					name: 'Nicaragua',
					displayName: 'Nicaragua',
				},
				{
					code: 'NE',
					name: 'Niger',
					displayName: 'Niger',
				},
				{
					code: 'NG',
					name: 'Nigeria',
					displayName: 'Nigeria',
				},
				{
					code: 'NU',
					name: 'Niue',
					displayName: 'Niue',
				},
				{
					code: 'NF',
					name: 'Norfolk Island',
					displayName: 'Norfolk Island',
				},
				{
					code: 'KP',
					name: 'North Korea',
					displayName: 'North Korea',
				},
				{
					code: 'MP',
					name: 'Northern Mariana Islands',
					displayName: 'Northern Mariana Islands',
				},
				{
					code: 'NO',
					name: 'Norway',
					displayName: 'Norway',
				},
				{
					code: 'OM',
					name: 'Oman',
					displayName: 'Oman',
				},
				{
					code: 'PK',
					name: 'Pakistan',
					displayName: 'Pakistan',
				},
				{
					code: 'PW',
					name: 'Palau',
					displayName: 'Palau',
				},
				{
					code: 'PS',
					name: 'Palestinian Territories',
					displayName: 'Palestinian Territories',
				},
				{
					code: 'PA',
					name: 'Panama',
					displayName: 'Panama',
				},
				{
					code: 'PG',
					name: 'Papua New Guinea',
					displayName: 'Papua New Guinea',
				},
				{
					code: 'PY',
					name: 'Paraguay',
					displayName: 'Paraguay',
				},
				{
					code: 'PE',
					name: 'Peru',
					displayName: 'Peru',
				},
				{
					code: 'PH',
					name: 'Philippines',
					displayName: 'Philippines',
				},
				{
					code: 'PN',
					name: 'Pitcairn',
					displayName: 'Pitcairn',
				},
				{
					code: 'PL',
					name: 'Poland',
					displayName: 'Poland',
				},
				{
					code: 'PT',
					name: 'Portugal',
					displayName: 'Portugal',
				},
				{
					code: 'PR',
					name: 'Puerto Rico',
					displayName: 'Puerto Rico',
				},
				{
					code: 'QA',
					name: 'Qatar',
					displayName: 'Qatar',
				},
				{
					code: 'RE',
					name: 'Reunion',
					displayName: 'Reunion',
				},
				{
					code: 'RO',
					name: 'Romania',
					displayName: 'Romania',
				},
				{
					code: 'RU',
					name: 'Russian Federation',
					displayName: 'Russian Federation',
				},
				{
					code: 'RW',
					name: 'Rwanda',
					displayName: 'Rwanda',
				},
				{
					code: 'BL',
					name: 'Saint Barthelemy',
					displayName: 'Saint Barthelemy',
				},
				{
					code: 'SH',
					name: 'Saint Helena, Ascension and Tristan da Cunha',
					displayName: 'Saint Helena, Ascension and Tristan da Cunha',
				},
				{
					code: 'KN',
					name: 'Saint Kitts and Nevis',
					displayName: 'Saint Kitts and Nevis',
				},
				{
					code: 'LC',
					name: 'Saint Lucia',
					displayName: 'Saint Lucia',
				},
				{
					code: 'MF',
					name: 'Saint Martin',
					displayName: 'Saint Martin',
				},
				{
					code: 'PM',
					name: 'Saint Pierre and Miquelon',
					displayName: 'Saint Pierre and Miquelon',
				},
				{
					code: 'VC',
					name: 'Saint Vincent and the Grenadines',
					displayName: 'Saint Vincent and the Grenadines',
				},
				{
					code: 'WS',
					name: 'Samoa',
					displayName: 'Samoa',
				},
				{
					code: 'SM',
					name: 'San Marino',
					displayName: 'San Marino',
				},
				{
					code: 'ST',
					name: 'Sao Tome and Principe',
					displayName: 'Sao Tome and Principe',
				},
				{
					code: 'SA',
					name: 'Saudi Arabia',
					displayName: 'Saudi Arabia',
				},
				{
					code: 'SN',
					name: 'Senegal',
					displayName: 'Senegal',
				},
				{
					code: 'RS',
					name: 'Serbia',
					displayName: 'Serbia',
				},
				{
					code: 'SC',
					name: 'Seychelles',
					displayName: 'Seychelles',
				},
				{
					code: 'SL',
					name: 'Sierra Leone',
					displayName: 'Sierra Leone',
				},
				{
					code: 'SG',
					name: 'Singapore',
					displayName: 'Singapore',
				},
				{
					code: 'SX',
					name: 'Sint Maarten',
					displayName: 'Sint Maarten',
				},
				{
					code: 'SK',
					name: 'Slovakia',
					displayName: 'Slovakia',
				},
				{
					code: 'SI',
					name: 'Slovenia',
					displayName: 'Slovenia',
				},
				{
					code: 'SB',
					name: 'Solomon Islands',
					displayName: 'Solomon Islands',
				},
				{
					code: 'SO',
					name: 'Somalia',
					displayName: 'Somalia',
				},
				{
					code: 'ZA',
					name: 'South Africa',
					displayName: 'South Africa',
				},
				{
					code: 'GS',
					name: 'South Georgia and the South Sandwich Islands',
					displayName: 'South Georgia and the South Sandwich Islands',
				},
				{
					code: 'SS',
					name: 'South Sudan',
					displayName: 'South Sudan',
				},
				{
					code: 'ES',
					name: 'Spain',
					displayName: 'Spain',
				},
				{
					code: 'LK',
					name: 'Sri Lanka',
					displayName: 'Sri Lanka',
				},
				{
					code: 'SR',
					name: 'Suriname',
					displayName: 'Suriname',
				},
				{
					code: 'SJ',
					name: 'Svalbard and Jan Mayen',
					displayName: 'Svalbard and Jan Mayen',
				},
				{
					code: 'SZ',
					name: 'Swaziland',
					displayName: 'Swaziland',
				},
				{
					code: 'SE',
					name: 'Sweden',
					displayName: 'Sweden',
				},
				{
					code: 'CH',
					name: 'Switzerland',
					displayName: 'Switzerland',
				},
				{
					code: 'SY',
					name: 'Syria',
					displayName: 'Syria',
				},
				{
					code: 'TW',
					name: 'Taiwan',
					displayName: 'Taiwan',
				},
				{
					code: 'TJ',
					name: 'Tajikistan',
					displayName: 'Tajikistan',
				},
				{
					code: 'TZ',
					name: 'Tanzania, United Republic of',
					displayName: 'Tanzania, United Republic of',
				},
				{
					code: 'TH',
					name: 'Thailand',
					displayName: 'Thailand',
				},
				{
					code: 'TL',
					name: 'Timor-leste',
					displayName: 'Timor-leste',
				},
				{
					code: 'TG',
					name: 'Togo',
					displayName: 'Togo',
				},
				{
					code: 'TK',
					name: 'Tokelau',
					displayName: 'Tokelau',
				},
				{
					code: 'TO',
					name: 'Tonga',
					displayName: 'Tonga',
				},
				{
					code: 'TT',
					name: 'Trinidad and Tobago',
					displayName: 'Trinidad and Tobago',
				},
				{
					code: 'TN',
					name: 'Tunisia',
					displayName: 'Tunisia',
				},
				{
					code: 'TR',
					name: 'Turkey',
					displayName: 'Turkey',
				},
				{
					code: 'TM',
					name: 'Turkmenistan',
					displayName: 'Turkmenistan',
				},
				{
					code: 'TC',
					name: 'Turks and Caicos Islands',
					displayName: 'Turks and Caicos Islands',
				},
				{
					code: 'TV',
					name: 'Tuvalu',
					displayName: 'Tuvalu',
				},
				{
					code: 'UG',
					name: 'Uganda',
					displayName: 'Uganda',
				},
				{
					code: 'UA',
					name: 'Ukraine',
					displayName: 'Ukraine',
				},
				{
					code: 'AE',
					name: 'United Arab Emirates',
					displayName: 'United Arab Emirates',
				},
				{
					code: 'GB',
					name: 'United Kingdom',
					displayName: 'United Kingdom',
				},
				{
					code: 'US',
					name: 'United States',
					displayName: 'United States',
				},
				{
					code: 'UM',
					name: 'United States Minor Outlying Islands',
					displayName: 'United States Minor Outlying Islands',
				},
				{
					code: 'UY',
					name: 'Uruguay',
					displayName: 'Uruguay',
				},
				{
					code: 'UZ',
					name: 'Uzbekistan',
					displayName: 'Uzbekistan',
				},
				{
					code: 'VU',
					name: 'Vanuatu',
					displayName: 'Vanuatu',
				},
				{
					code: 'VE',
					name: 'Venezuela',
					displayName: 'Venezuela',
				},
				{
					code: 'VN',
					name: 'Vietnam',
					displayName: 'Vietnam',
				},
				{
					code: 'VG',
					name: 'Virgin Islands, British',
					displayName: 'Virgin Islands, British',
				},
				{
					code: 'VI',
					name: 'Virgin Islands, U.S.',
					displayName: 'Virgin Islands, U.S.',
				},
				{
					code: 'WF',
					name: 'Wallis and Futuna',
					displayName: 'Wallis and Futuna',
				},
				{
					code: 'EH',
					name: 'Western Sahara',
					displayName: 'Western Sahara',
				},
				{
					code: 'YE',
					name: 'Yemen',
					displayName: 'Yemen',
				},
				{
					code: 'ZM',
					name: 'Zambia',
					displayName: 'Zambia',
				},
				{
					code: 'ZW',
					name: 'Zimbabwe',
					displayName: 'Zimbabwe',
				},
			],
		});
	},
};
