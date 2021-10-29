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
				selectedProduct: {
					ProductId: 480,
					Name: 'Roblox Premium 450',
					DurationTitle: 'Monthly',
					Price: 4.99,
					IsCurrentPremiumFeature: false,
					PremiumFeatureId: 0,
					Rank: 0,
					IsDisabled: false,
					Expiration: '2021-03-18T11:19:35.5407453-05:00',
					IsRenewable: true,
					RenewOrExpireText:
						'Renews On: <span class="date-time-i18n" data-date-time-i18n-value="3/18/2021" data-date-time-i18n-format="short"></span>',
					ImageFile: null,
					PriceText: '$4.99',
					GiftcardShoppingCartProductId: 0,
				},
				availableCredit: 0,
				totalDue: 4.99,
				balance: -4.99,
				isNewInCommEndpointEnabled: false,
				isNewGiftCardEndpointEnabled: false,
			},
			redirectionUrl: null,
		});
	},
};
