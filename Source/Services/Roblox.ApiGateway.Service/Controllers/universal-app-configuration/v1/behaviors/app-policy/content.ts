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
			ChatConversationHeaderGroupDetails: true,
			ChatHeaderSearch: true,
			ChatHeaderCreateChatGroup: true,
			ChatHeaderHomeButton: false,
			ChatHeaderNotifications: true,
			ChatPlayTogether: true,
			ChatShareGameToChatFromChat: true,
			ChatTapConversationThumbnail: true,
			GamesDropDownList: true,
			GameDetailsMorePage: true,
			GameDetailsShowGlobalCounters: true,
			GameDetailsSubtitle: true,
			GameInfoList: true,
			GameInfoListDeveloper: true,
			GamePlaysAndRatings: true,
			Notifications: true,
			RecommendedGames: true,
			SearchBar: true,
			MorePageType: 'More',
			AboutPageType: 'About',
			FriendFinder: true,
			SocialLinks: true,
			SocialGroupLinks: true,
			SiteMessageBanner: true,
			UseWidthBasedFormFactorRule: false,
			UseHomePageWithAvatarAndPanel: false,
			UseBottomBar: true,
			AvatarHeaderIcon: 'LuaApp/icons/ic-back',
			AvatarEditorShowBuyRobuxOnTopBar: true,
			HomeIcon: 'LuaApp/icons/ic-roblox-close',
			ShowYouTubeAgeAlert: false,
			GameDetailsShareButton: true,
			CatalogShareButton: true,
			AccountProviderName: '',
			InviteFromAccountProvider: false,
			ShareToAccountProvider: false,
			ShareToAccountProviderTimeout: 8,
			ShowDisplayName: false,
			GamesPageCreationCenterTitle: false,
			ShowShareTargetGameCreator: true,
			SearchAutoComplete: false,
			CatalogShow3dView: true,
			CatalogCommunityCreations: true,
			CatalogPremiumCategory: true,
			ItemDetailsFullView: true,
			UseAvatarExperienceLandingPage: true,
			HomePageFriendSection: true,
			HomePageProfileLink: true,
		});
	},
};
