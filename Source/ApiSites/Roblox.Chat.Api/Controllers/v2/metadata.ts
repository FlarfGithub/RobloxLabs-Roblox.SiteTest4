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
			isChatEnabledByPrivacySetting: 1,
			languageForPrivacySettingUnavailable: 'Chat is currently unavailable',
			maxConversationTitleLength: 150,
			numberOfMembersForPartyChrome: 6,
			partyChromeDisplayTimeStampInterval: 300000,
			signalRDisconnectionResponseInMilliseconds: 3000,
			typingInChatFromSenderThrottleMs: 5000,
			typingInChatForReceiverExpirationMs: 8000,
			relativeValueToRecordUiPerformance: 0.0,
			isChatDataFromLocalStorageEnabled: false,
			chatDataFromLocalStorageExpirationSeconds: 30,
			isUsingCacheToLoadFriendsInfoEnabled: false,
			cachedDataFromLocalStorageExpirationMS: 30000,
			senderTypesForUnknownMessageTypeError: ['User'],
			isInvalidMessageTypeFallbackEnabled: false,
			isRespectingMessageTypeEnabled: true,
			validMessageTypesWhiteList: ['PlainText', 'Link'],
			shouldRespectConversationHasUnreadMessageToMarkAsRead: true,
			isVoiceChatForClientSideEnabled: true,
			isAliasChatForClientSideEnabled: true,
			isPlayTogetherForGameCardsEnabled: true,
			isRoactChatEnabled: true,
		});
	},
};
