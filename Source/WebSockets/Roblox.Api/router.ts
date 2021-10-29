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

import ws from 'ws';
import c from 'crypto';

export default {
	dir: '/v1/router/signalr',
	func: (socket: ws): void => {
		let n = 0;
		const i = setInterval(() => {
			socket.send(c.createHash('sha512').update(c.randomBytes(1000)).digest('hex'));
			n += 1;
			if (n === 10) {
				i.unref();
				return socket.close();
			}
		}, 5000);
	},
};
