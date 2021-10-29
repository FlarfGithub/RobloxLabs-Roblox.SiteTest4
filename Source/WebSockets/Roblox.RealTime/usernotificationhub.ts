/*
	FileName: router.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: WWW's websocket
	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com
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

//{"C":"d-9042436C-B,0|z9cD,1|z8Ru,5|z9cE,1","M":[{"H":"UserNotificationHub","M":"notification","A":["FriendshipNotifications","{\"Type\":\"FriendshipRequested\",\"EventArgs\":{\"UserId1\":2377893199,\"UserId2\":158190828},\"SequenceNumber\":49}",0]}]}

import evt from '../../Assemblies/Web/EventManager/Roblox.Web.EventManager/Notifications';
import a from 'axios';
import evts from 'events';
import { IncomingMessage } from 'http';
import ws from 'ws';
import { FASTLOG, FASTLOGS, FLog, LOGGROUP } from '../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';

LOGGROUP('WebSockets');

export default {
	dir: '/notifications/connect',
	func: (socket: ws, req: IncomingMessage): void => {
		let seq = 1;
		const e = new evts.EventEmitter();
		evt.subscribe(req.headers.cookie, e);
		e.on('message', (m, uid) => {
			FASTLOG(
				FLog['WebSockets'],
				'[FLog::WebSockets] Message request!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ' + m,
			);
			console.log(m, uid);
			a.get('https://assetgame.roblox.com/Game/GetCurrentUser.ashx', {
				headers: { Cookie: req.headers.cookie },
			})
				.then((re2) => {
					let iscurrentuser = false;
					uid.forEach((element) => {
						console.log(element.toString() === re2.data, element === re2.data, element === parseInt(re2.data));
						if (element === re2.data) iscurrentuser = true;
					});
					if (iscurrentuser) {
						console.log(m);
						socket.send(
							JSON.stringify({
								C: 'd-5D8C14A5-B,0|F2hw,1|F2BE,2|F2hx,1',
								M: [
									{
										H: 'UserNotificationHub',
										M: 'notification',
										A: [
											'ChatNotifications',
											JSON.stringify({
												ConversationId: m,
												ActorTargetId: null,
												ActorType: null,
												Type: 'NewMessage',
												SequenceNumber: 130 + seq,
											}),
											0,
										],
									},
								],
							}),
						);
						seq++;
					}
				})
				.catch((e) => {
					FASTLOGS(FLog['WebSockets'], '[FLog::WebSockets] There was an error with this because: %s', e.message);
					return;
				});
		});
		e.on('typing', (uid) => {
			console.log(uid);
			a.get('https://assetgame.roblox.com/Game/GetCurrentUser.ashx', {
				headers: { Cookie: req.headers.cookie },
			})
				.then((re2) => {
					let iscurrentuser = false;
					uid.forEach((element) => {
						console.log(element.toString() === re2.data, element === re2.data, element === parseInt(re2.data));
						if (element === re2.data) iscurrentuser = true;
					});
					if (iscurrentuser) {
						socket.send(
							JSON.stringify({
								C: 'd-5D8C14A5-B,0|F2hw,1|F2BE,3|F2hx,1',
								M: [
									{
										H: 'UserNotificationHub',
										M: 'notification',
										A: [
											'ChatNotifications',
											'{"UserId":2377893199,"IsTyping":true,"ConversationId":9629329337,"ActorTargetId":null,"ActorType":null,"Type":"ParticipantTyping","SequenceNumber":133}',
											0,
										],
									},
								],
							}),
						);
						seq++;
					}
				})
				.catch((e) => {
					FASTLOGS(FLog['WebSockets'], '[FLog::WebSockets] There was an error with this because: %s', e.message);
					return;
				});
		});
		FASTLOG(FLog['WebSockets'], '[FLog::WebSockets] Connection opened for realtime, echoeing back');
		socket.send(JSON.stringify({ C: 'd-9042436C-B,0|z9cD,0|z8Ru,0|z9cE,1', S: 1, M: [] }));
		socket.send(
			JSON.stringify({
				C: 'd-9042436C-B,0|z9cD,1|z8Ru,0|z9cE,1',
				M: [
					{
						H: 'UserNotificationHub',
						M: 'subscriptionStatus',
						A: [
							'Subscribed',
							'{"MillisecondsBeforeHandlingReconnect":0,"SequenceNumber":4852,"NamespaceSequenceNumbers":{"GameCloseNotifications":286,"CloudEditChatNotifications":152,"AuthenticationNotifications":30,"ChatNotifications":86,"FriendshipNotifications":48,"UserTagChangeNotification":3,"AvatarAssetOwnershipNotifications":3,"NotificationStream":13,"GameFavoriteNotifications":1}}',
						],
					},
				],
			}),
		);
		let r = setInterval(() => {
			socket.send('{}');
		}, 10000);
		socket.on('close', () => {
			r.unref();
			r = undefined;
			socket.close();
			evt.unsubscribe(req.headers.cookie);
		});
	},
};
