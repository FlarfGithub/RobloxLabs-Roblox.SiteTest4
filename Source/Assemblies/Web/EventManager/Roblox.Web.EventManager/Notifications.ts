import evts from 'events';
const evtss = new Map<string, evts.EventEmitter>();
export default {
	subscribe: (key: string, evt: evts.EventEmitter) => {
		evtss.set(key, evt);
	},
	unsubscribe: (key: string) => {
		evtss.delete(key);
	},
	push: (id: string, cid: string, userid: number[]) => {
		evtss.forEach((v, k) => {
			if (k === id) v.emit('message', cid, userid);
		});
	},
};
