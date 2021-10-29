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
			viewModel: {
				paymentProviderType: 0,
				selectedProduct: {
					ProductId: 480,
					Name: 'Roblox Premium 450',
					DurationTitle: 'Monthly',
					Price: 4.99,
					IsCurrentPremiumFeature: false,
					PremiumFeatureId: 0,
					Rank: 0,
					IsDisabled: false,
					Expiration: '2021-03-18T11:23:45.0793502-05:00',
					IsRenewable: true,
					RenewOrExpireText: 'Renews On: 3/18/2021',
					ImageFile: null,
					PriceText: '$4.99',
					GiftcardShoppingCartProductId: 0,
				},
				selectedProductBcVersion: null,
				robuxBcBonus: 0,
				selectedUpsellProductId: 0,
				dataViewModel: {
					isDesktopLocalPricingEnabled: true,
					countryCurrencyTypeId: 1,
					selectedProductPrice: 4.99,
					currencyTypeId: 1,
					currency: {
						Id: 1,
						CurrencyType: 0,
						CurrencyName: 'United States dollar',
						CurrencySymbol: '$',
					},
				},
				userBillingInfo: {
					countries: [
						{
							code: 'AF',
							name: 'Afghanistan',
							isSelected: false,
						},
						{
							code: 'AX',
							name: 'Aland Islands',
							isSelected: false,
						},
						{
							code: 'AL',
							name: 'Albania',
							isSelected: false,
						},
						{
							code: 'DZ',
							name: 'Algeria',
							isSelected: false,
						},
						{
							code: 'AS',
							name: 'American Samoa',
							isSelected: false,
						},
						{
							code: 'AD',
							name: 'Andorra',
							isSelected: false,
						},
						{
							code: 'AO',
							name: 'Angola',
							isSelected: false,
						},
						{
							code: 'AI',
							name: 'Anguilla',
							isSelected: false,
						},
						{
							code: 'AQ',
							name: 'Antarctica',
							isSelected: false,
						},
						{
							code: 'AG',
							name: 'Antigua and Barbuda',
							isSelected: false,
						},
						{
							code: 'AR',
							name: 'Argentina',
							isSelected: false,
						},
						{
							code: 'AM',
							name: 'Armenia',
							isSelected: false,
						},
						{
							code: 'AW',
							name: 'Aruba',
							isSelected: false,
						},
						{
							code: 'AU',
							name: 'Australia',
							isSelected: false,
						},
						{
							code: 'AT',
							name: 'Austria',
							isSelected: false,
						},
						{
							code: 'AZ',
							name: 'Azerbaijan',
							isSelected: false,
						},
						{
							code: 'BS',
							name: 'Bahamas',
							isSelected: false,
						},
						{
							code: 'BH',
							name: 'Bahrain',
							isSelected: false,
						},
						{
							code: 'BD',
							name: 'Bangladesh',
							isSelected: false,
						},
						{
							code: 'BB',
							name: 'Barbados',
							isSelected: false,
						},
						{
							code: 'BY',
							name: 'Belarus',
							isSelected: false,
						},
						{
							code: 'BE',
							name: 'Belgium',
							isSelected: false,
						},
						{
							code: 'BZ',
							name: 'Belize',
							isSelected: false,
						},
						{
							code: 'BJ',
							name: 'Benin',
							isSelected: false,
						},
						{
							code: 'BM',
							name: 'Bermuda',
							isSelected: false,
						},
						{
							code: 'BT',
							name: 'Bhutan',
							isSelected: false,
						},
						{
							code: 'BO',
							name: 'Bolivia',
							isSelected: false,
						},
						{
							code: 'BQ',
							name: 'Bonaire, Saint Eustatius and Saba',
							isSelected: false,
						},
						{
							code: 'BA',
							name: 'Bosnia and Herzegovina',
							isSelected: false,
						},
						{
							code: 'BW',
							name: 'Botswana',
							isSelected: false,
						},
						{
							code: 'BV',
							name: 'Bouvet Island',
							isSelected: false,
						},
						{
							code: 'BR',
							name: 'Brazil',
							isSelected: false,
						},
						{
							code: 'IO',
							name: 'British Indian Ocean Territory',
							isSelected: false,
						},
						{
							code: 'BN',
							name: 'Brunei Darussalam',
							isSelected: false,
						},
						{
							code: 'BG',
							name: 'Bulgaria',
							isSelected: false,
						},
						{
							code: 'BF',
							name: 'Burkina Faso',
							isSelected: false,
						},
						{
							code: 'BI',
							name: 'Burundi',
							isSelected: false,
						},
						{
							code: 'KH',
							name: 'Cambodia',
							isSelected: false,
						},
						{
							code: 'CM',
							name: 'Cameroon',
							isSelected: false,
						},
						{
							code: 'CA',
							name: 'Canada',
							isSelected: false,
						},
						{
							code: 'CV',
							name: 'Cape Verde',
							isSelected: false,
						},
						{
							code: 'KY',
							name: 'Cayman Islands',
							isSelected: false,
						},
						{
							code: 'CF',
							name: 'Central African Republic',
							isSelected: false,
						},
						{
							code: 'TD',
							name: 'Chad',
							isSelected: false,
						},
						{
							code: 'CL',
							name: 'Chile',
							isSelected: false,
						},
						{
							code: 'CN',
							name: 'China',
							isSelected: false,
						},
						{
							code: 'C2',
							name: 'China - Global App',
							isSelected: false,
						},
						{
							code: 'CX',
							name: 'Christmas Island',
							isSelected: false,
						},
						{
							code: 'CC',
							name: 'Cocos Islands',
							isSelected: false,
						},
						{
							code: 'CO',
							name: 'Colombia',
							isSelected: false,
						},
						{
							code: 'KM',
							name: 'Comoros',
							isSelected: false,
						},
						{
							code: 'CG',
							name: 'Congo',
							isSelected: false,
						},
						{
							code: 'CD',
							name: 'Congo (DRC)',
							isSelected: false,
						},
						{
							code: 'CK',
							name: 'Cook Islands',
							isSelected: false,
						},
						{
							code: 'CR',
							name: 'Costa Rica',
							isSelected: false,
						},
						{
							code: 'CI',
							name: 'Ivory Coast',
							isSelected: false,
						},
						{
							code: 'HR',
							name: 'Croatia',
							isSelected: false,
						},
						{
							code: 'CU',
							name: 'Cuba',
							isSelected: false,
						},
						{
							code: 'CW',
							name: 'Curaçao',
							isSelected: false,
						},
						{
							code: 'CY',
							name: 'Cyprus',
							isSelected: false,
						},
						{
							code: 'CZ',
							name: 'Czech Republic',
							isSelected: false,
						},
						{
							code: 'DK',
							name: 'Denmark',
							isSelected: false,
						},
						{
							code: 'DJ',
							name: 'Djibouti',
							isSelected: false,
						},
						{
							code: 'DM',
							name: 'Dominica',
							isSelected: false,
						},
						{
							code: 'DO',
							name: 'Dominican Republic',
							isSelected: false,
						},
						{
							code: 'EC',
							name: 'Ecuador',
							isSelected: false,
						},
						{
							code: 'EG',
							name: 'Egypt',
							isSelected: false,
						},
						{
							code: 'SV',
							name: 'El Salvador',
							isSelected: false,
						},
						{
							code: 'GQ',
							name: 'Equatorial Guinea',
							isSelected: false,
						},
						{
							code: 'ER',
							name: 'Eritrea',
							isSelected: false,
						},
						{
							code: 'EE',
							name: 'Estonia',
							isSelected: false,
						},
						{
							code: 'ET',
							name: 'Ethiopia',
							isSelected: false,
						},
						{
							code: 'FK',
							name: 'Falkland Islands (Malvinas)',
							isSelected: false,
						},
						{
							code: 'FO',
							name: 'Faroe Islands',
							isSelected: false,
						},
						{
							code: 'FJ',
							name: 'Fiji',
							isSelected: false,
						},
						{
							code: 'FI',
							name: 'Finland',
							isSelected: false,
						},
						{
							code: 'FR',
							name: 'France',
							isSelected: false,
						},
						{
							code: 'GF',
							name: 'French Guiana',
							isSelected: false,
						},
						{
							code: 'PF',
							name: 'French Polynesia',
							isSelected: false,
						},
						{
							code: 'TF',
							name: 'French Southern Territories',
							isSelected: false,
						},
						{
							code: 'GA',
							name: 'Gabon',
							isSelected: false,
						},
						{
							code: 'GM',
							name: 'Gambia',
							isSelected: false,
						},
						{
							code: 'GE',
							name: 'Georgia',
							isSelected: false,
						},
						{
							code: 'DE',
							name: 'Germany',
							isSelected: false,
						},
						{
							code: 'GH',
							name: 'Ghana',
							isSelected: false,
						},
						{
							code: 'GI',
							name: 'Gibraltar',
							isSelected: false,
						},
						{
							code: 'GR',
							name: 'Greece',
							isSelected: false,
						},
						{
							code: 'GL',
							name: 'Greenland',
							isSelected: false,
						},
						{
							code: 'GD',
							name: 'Grenada',
							isSelected: false,
						},
						{
							code: 'GP',
							name: 'Guadeloupe',
							isSelected: false,
						},
						{
							code: 'GU',
							name: 'Guam',
							isSelected: false,
						},
						{
							code: 'GT',
							name: 'Guatemala',
							isSelected: false,
						},
						{
							code: 'GG',
							name: 'Guernsey',
							isSelected: false,
						},
						{
							code: 'GN',
							name: 'Guinea',
							isSelected: false,
						},
						{
							code: 'GW',
							name: 'Guinea-Bissau',
							isSelected: false,
						},
						{
							code: 'GY',
							name: 'Guyana',
							isSelected: false,
						},
						{
							code: 'HT',
							name: 'Haiti',
							isSelected: false,
						},
						{
							code: 'HM',
							name: 'Heard Island and the McDonald Islands',
							isSelected: false,
						},
						{
							code: 'VA',
							name: 'Holy See',
							isSelected: false,
						},
						{
							code: 'HN',
							name: 'Honduras',
							isSelected: false,
						},
						{
							code: 'HK',
							name: 'Hong Kong',
							isSelected: false,
						},
						{
							code: 'HU',
							name: 'Hungary',
							isSelected: false,
						},
						{
							code: 'IS',
							name: 'Iceland',
							isSelected: false,
						},
						{
							code: 'IN',
							name: 'India',
							isSelected: false,
						},
						{
							code: 'ID',
							name: 'Indonesia',
							isSelected: false,
						},
						{
							code: 'IR',
							name: 'Iran',
							isSelected: false,
						},
						{
							code: 'IQ',
							name: 'Iraq',
							isSelected: false,
						},
						{
							code: 'IE',
							name: 'Ireland',
							isSelected: false,
						},
						{
							code: 'IM',
							name: 'Isle of Man',
							isSelected: false,
						},
						{
							code: 'IL',
							name: 'Israel',
							isSelected: false,
						},
						{
							code: 'IT',
							name: 'Italy',
							isSelected: false,
						},
						{
							code: 'JM',
							name: 'Jamaica',
							isSelected: false,
						},
						{
							code: 'JP',
							name: 'Japan',
							isSelected: false,
						},
						{
							code: 'JE',
							name: 'Jersey',
							isSelected: false,
						},
						{
							code: 'JO',
							name: 'Jordan',
							isSelected: false,
						},
						{
							code: 'KZ',
							name: 'Kazakhstan',
							isSelected: false,
						},
						{
							code: 'KE',
							name: 'Kenya',
							isSelected: false,
						},
						{
							code: 'KI',
							name: 'Kiribati',
							isSelected: false,
						},
						{
							code: 'KR',
							name: 'Korea',
							isSelected: false,
						},
						{
							code: 'KW',
							name: 'Kuwait',
							isSelected: false,
						},
						{
							code: 'KG',
							name: 'Kyrgyzstan',
							isSelected: false,
						},
						{
							code: 'LA',
							name: 'Laos',
							isSelected: false,
						},
						{
							code: 'LV',
							name: 'Latvia',
							isSelected: false,
						},
						{
							code: 'LB',
							name: 'Lebanon',
							isSelected: false,
						},
						{
							code: 'LS',
							name: 'Lesotho',
							isSelected: false,
						},
						{
							code: 'LR',
							name: 'Liberia',
							isSelected: false,
						},
						{
							code: 'LY',
							name: 'Libya',
							isSelected: false,
						},
						{
							code: 'LI',
							name: 'Liechtenstein',
							isSelected: false,
						},
						{
							code: 'LT',
							name: 'Lithuania',
							isSelected: false,
						},
						{
							code: 'LU',
							name: 'Luxembourg',
							isSelected: false,
						},
						{
							code: 'MO',
							name: 'Macao',
							isSelected: false,
						},
						{
							code: 'MK',
							name: 'Macedonia',
							isSelected: false,
						},
						{
							code: 'MG',
							name: 'Madagascar',
							isSelected: false,
						},
						{
							code: 'MW',
							name: 'Malawi',
							isSelected: false,
						},
						{
							code: 'MY',
							name: 'Malaysia',
							isSelected: false,
						},
						{
							code: 'MV',
							name: 'Maldives',
							isSelected: false,
						},
						{
							code: 'ML',
							name: 'Mali',
							isSelected: false,
						},
						{
							code: 'MT',
							name: 'Malta',
							isSelected: false,
						},
						{
							code: 'MH',
							name: 'Marshall Islands',
							isSelected: false,
						},
						{
							code: 'MQ',
							name: 'Martinique',
							isSelected: false,
						},
						{
							code: 'MR',
							name: 'Mauritania',
							isSelected: false,
						},
						{
							code: 'MU',
							name: 'Mauritius',
							isSelected: false,
						},
						{
							code: 'YT',
							name: 'Mayotte',
							isSelected: false,
						},
						{
							code: 'MX',
							name: 'Mexico',
							isSelected: false,
						},
						{
							code: 'FM',
							name: 'Micronesia',
							isSelected: false,
						},
						{
							code: 'MD',
							name: 'Moldova',
							isSelected: false,
						},
						{
							code: 'MC',
							name: 'Monaco',
							isSelected: false,
						},
						{
							code: 'MN',
							name: 'Mongolia',
							isSelected: false,
						},
						{
							code: 'ME',
							name: 'Montenegro',
							isSelected: false,
						},
						{
							code: 'MS',
							name: 'Montserrat',
							isSelected: false,
						},
						{
							code: 'MA',
							name: 'Morocco',
							isSelected: false,
						},
						{
							code: 'MZ',
							name: 'Mozambique',
							isSelected: false,
						},
						{
							code: 'MM',
							name: 'Myanmar',
							isSelected: false,
						},
						{
							code: 'NA',
							name: 'Namibia',
							isSelected: false,
						},
						{
							code: 'NR',
							name: 'Nauru',
							isSelected: false,
						},
						{
							code: 'NP',
							name: 'Nepal',
							isSelected: false,
						},
						{
							code: 'NL',
							name: 'Netherlands',
							isSelected: false,
						},
						{
							code: 'AN',
							name: 'Netherlands Antilles',
							isSelected: false,
						},
						{
							code: 'NC',
							name: 'New Caledonia',
							isSelected: false,
						},
						{
							code: 'NZ',
							name: 'New Zealand',
							isSelected: false,
						},
						{
							code: 'NI',
							name: 'Nicaragua',
							isSelected: false,
						},
						{
							code: 'NE',
							name: 'Niger',
							isSelected: false,
						},
						{
							code: 'NG',
							name: 'Nigeria',
							isSelected: false,
						},
						{
							code: 'NU',
							name: 'Niue',
							isSelected: false,
						},
						{
							code: 'NF',
							name: 'Norfolk Island',
							isSelected: false,
						},
						{
							code: 'KP',
							name: 'North Korea',
							isSelected: false,
						},
						{
							code: 'MP',
							name: 'Northern Mariana Islands',
							isSelected: false,
						},
						{
							code: 'NO',
							name: 'Norway',
							isSelected: false,
						},
						{
							code: 'OM',
							name: 'Oman',
							isSelected: false,
						},
						{
							code: 'PK',
							name: 'Pakistan',
							isSelected: false,
						},
						{
							code: 'PW',
							name: 'Palau',
							isSelected: false,
						},
						{
							code: 'PS',
							name: 'Palestine',
							isSelected: false,
						},
						{
							code: 'PA',
							name: 'Panama',
							isSelected: false,
						},
						{
							code: 'PG',
							name: 'Papua New Guinea',
							isSelected: false,
						},
						{
							code: 'PY',
							name: 'Paraguay',
							isSelected: false,
						},
						{
							code: 'PE',
							name: 'Peru',
							isSelected: false,
						},
						{
							code: 'PH',
							name: 'Philippines',
							isSelected: false,
						},
						{
							code: 'PN',
							name: 'Pitcairn Islands',
							isSelected: false,
						},
						{
							code: 'PL',
							name: 'Poland',
							isSelected: false,
						},
						{
							code: 'PT',
							name: 'Portugal',
							isSelected: false,
						},
						{
							code: 'PR',
							name: 'Puerto Rico',
							isSelected: false,
						},
						{
							code: 'QA',
							name: 'Qatar',
							isSelected: false,
						},
						{
							code: 'RE',
							name: 'Reunion',
							isSelected: false,
						},
						{
							code: 'RO',
							name: 'Romania',
							isSelected: false,
						},
						{
							code: 'RU',
							name: 'Russian Federation',
							isSelected: false,
						},
						{
							code: 'RW',
							name: 'Rwanda',
							isSelected: false,
						},
						{
							code: 'BL',
							name: 'Saint Barthelemy',
							isSelected: false,
						},
						{
							code: 'SH',
							name: 'Saint Helena, Ascension and Tristan da Cunha',
							isSelected: false,
						},
						{
							code: 'KN',
							name: 'Saint Kitts and Nevis',
							isSelected: false,
						},
						{
							code: 'LC',
							name: 'Saint Lucia',
							isSelected: false,
						},
						{
							code: 'MF',
							name: 'Saint Martin',
							isSelected: false,
						},
						{
							code: 'PM',
							name: 'Saint Pierre and Miquelon',
							isSelected: false,
						},
						{
							code: 'VC',
							name: 'Saint Vincent and the Grenadines',
							isSelected: false,
						},
						{
							code: 'WS',
							name: 'Samoa',
							isSelected: false,
						},
						{
							code: 'SM',
							name: 'San Marino',
							isSelected: false,
						},
						{
							code: 'ST',
							name: 'Sao Tome and Principe',
							isSelected: false,
						},
						{
							code: 'SA',
							name: 'Saudi Arabia',
							isSelected: false,
						},
						{
							code: 'SN',
							name: 'Senegal',
							isSelected: false,
						},
						{
							code: 'RS',
							name: 'Serbia',
							isSelected: false,
						},
						{
							code: 'SC',
							name: 'Seychelles',
							isSelected: false,
						},
						{
							code: 'SL',
							name: 'Sierra Leone',
							isSelected: false,
						},
						{
							code: 'SG',
							name: 'Singapore',
							isSelected: false,
						},
						{
							code: 'SX',
							name: 'Sint Maarten',
							isSelected: false,
						},
						{
							code: 'SK',
							name: 'Slovakia',
							isSelected: false,
						},
						{
							code: 'SI',
							name: 'Slovenia',
							isSelected: false,
						},
						{
							code: 'SB',
							name: 'Solomon Islands',
							isSelected: false,
						},
						{
							code: 'SO',
							name: 'Somalia',
							isSelected: false,
						},
						{
							code: 'ZA',
							name: 'South Africa',
							isSelected: false,
						},
						{
							code: 'GS',
							name: 'South Georgia and the South Sandwich Islands',
							isSelected: false,
						},
						{
							code: 'SS',
							name: 'South Sudan',
							isSelected: false,
						},
						{
							code: 'ES',
							name: 'Spain',
							isSelected: false,
						},
						{
							code: 'LK',
							name: 'Sri Lanka',
							isSelected: false,
						},
						{
							code: 'SR',
							name: 'Suriname',
							isSelected: false,
						},
						{
							code: 'SJ',
							name: 'Svalbard and Jan Mayen',
							isSelected: false,
						},
						{
							code: 'SZ',
							name: 'Swaziland',
							isSelected: false,
						},
						{
							code: 'SE',
							name: 'Sweden',
							isSelected: false,
						},
						{
							code: 'CH',
							name: 'Switzerland',
							isSelected: false,
						},
						{
							code: 'SY',
							name: 'Syria',
							isSelected: false,
						},
						{
							code: 'TW',
							name: 'Taiwan',
							isSelected: false,
						},
						{
							code: 'TJ',
							name: 'Tajikistan',
							isSelected: false,
						},
						{
							code: 'TZ',
							name: 'Tanzania',
							isSelected: false,
						},
						{
							code: 'TH',
							name: 'Thailand',
							isSelected: false,
						},
						{
							code: 'TL',
							name: 'Timor-leste',
							isSelected: false,
						},
						{
							code: 'TG',
							name: 'Togo',
							isSelected: false,
						},
						{
							code: 'TK',
							name: 'Tokelau',
							isSelected: false,
						},
						{
							code: 'TO',
							name: 'Tonga',
							isSelected: false,
						},
						{
							code: 'TT',
							name: 'Trinidad and Tobago',
							isSelected: false,
						},
						{
							code: 'TN',
							name: 'Tunisia',
							isSelected: false,
						},
						{
							code: 'TR',
							name: 'Turkey',
							isSelected: false,
						},
						{
							code: 'TM',
							name: 'Turkmenistan',
							isSelected: false,
						},
						{
							code: 'TC',
							name: 'Turks and Caicos Islands',
							isSelected: false,
						},
						{
							code: 'TV',
							name: 'Tuvalu',
							isSelected: false,
						},
						{
							code: 'UG',
							name: 'Uganda',
							isSelected: false,
						},
						{
							code: 'UA',
							name: 'Ukraine',
							isSelected: false,
						},
						{
							code: 'AE',
							name: 'United Arab Emirates',
							isSelected: false,
						},
						{
							code: 'GB',
							name: 'United Kingdom',
							isSelected: false,
						},
						{
							code: 'US',
							name: 'United States',
							isSelected: true,
						},
						{
							code: 'UM',
							name: 'United States Minor Outlying Islands',
							isSelected: false,
						},
						{
							code: 'UY',
							name: 'Uruguay',
							isSelected: false,
						},
						{
							code: 'UZ',
							name: 'Uzbekistan',
							isSelected: false,
						},
						{
							code: 'VU',
							name: 'Vanuatu',
							isSelected: false,
						},
						{
							code: 'VE',
							name: 'Venezuela',
							isSelected: false,
						},
						{
							code: 'VN',
							name: 'Vietnam',
							isSelected: false,
						},
						{
							code: 'VG',
							name: 'Virgin Islands (British)',
							isSelected: false,
						},
						{
							code: 'VI',
							name: 'Virgin Islands (US)',
							isSelected: false,
						},
						{
							code: 'WF',
							name: 'Wallis and Futuna',
							isSelected: false,
						},
						{
							code: 'EH',
							name: 'Western Sahara',
							isSelected: false,
						},
						{
							code: 'YE',
							name: 'Yemen',
							isSelected: false,
						},
						{
							code: 'ZM',
							name: 'Zambia',
							isSelected: false,
						},
						{
							code: 'ZW',
							name: 'Zimbabwe',
							isSelected: false,
						},
					],
					firstName: null,
					lastName: null,
					address1: null,
					address2: null,
					city: null,
					state: null,
					zip: null,
					country: null,
					email: null,
					phone: null,
				},
				creditCard: null,
				vantivIframeViewModel: {
					eprotectClientJsSource: 'https://request.eprotect.vantivcnp.com/eProtect/js/payframe-client.min.js',
					eprotectId: '9WR8BA9LJAuTv5hM',
					cssFilename: 'EprotectPaymentV5',
					reportGroup: 'eProtect',
					timeoutInMilliseconds: 15000,
					orderId: '156632429_480',
					paypageRegistrationId: null,
					maskedCreditCardInfoModel: null,
				},
				displayDoublePurchase: false,
				doublePurchaseConfirmed: false,
				isKountEnabled: true,
				kountNoIFrameEnabled: false,
				kountScriptSDKUrl: null,
				kountUrl: 'https://ssl.kaptcha.com:443/logo.htm?m=136700&s=51621a8df195485ab1640a15c895666c',
				kountSessionId: '51621a8df195485ab1640a15c895666c',
				isVantivThreatMetrixEnabled: true,
				vantivThreatMetrixScriptUrl: 'https://h.online-metrix.net/fp/tags.js?org_id=94redci2&session_id=roblx-26130531630&pageid=1',
				vantivThreatMetrixIframeUrl: 'https://h.online-metrix.net/tags?org_id=94redci2&session_id=roblx-26130531630&pageid=1',
				vantivThreatMetrixSessionId: 'roblx-26130531630',
				vantivPaymentAbTestVariationValue: null,
				isIframeLoadingForVantivEnabled: true,
				iframeLoadingTimeOutForVantiv: 500,
			},
			redirectLink: null,
		});
	},
};
