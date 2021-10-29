import { Request, Response } from 'express';
import { DFInt, DYNAMIC_FASTINTVARIABLE } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';

DYNAMIC_FASTINTVARIABLE('CPUTicksConsumedMax', 1000);
DYNAMIC_FASTINTVARIABLE('UsedMemoryMax', 1.611e9);
DYNAMIC_FASTINTVARIABLE('UsedMemoryMin', 5.369e7);

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		if (request.query && request.query.index && parseInt(request.query.index.toString()) > 1) return;

		const cpu = between(1, 100);
		const total = 100 - cpu;
		const sys = total - 2;
		const user = sys - 1.1;

		return response.status(200).send({
			AllocDirStats: {
				Available: 22499606528,
				Device: '',
				InodesUsedPercent: 4.3796502976190474,
				Mountpoint: '',
				Size: 25832407040,
				Used: 3316023296,
				UsedPercent: 12.845021867013273,
			},
			CPU: [{ CPU: 'cpu0', Idle: cpu, System: sys, Total: total, User: user }],
			CPUTicksConsumed: between(0, DFInt('CPUTicksConsumedMax') /* 37200 */),
			DeviceStats: null,
			DiskStats: [
				{
					Available: 22499606528,
					Device: '/dev/vda1',
					InodesUsedPercent: 4.3796502976190474,
					Mountpoint: '/',
					Size: 25832407040,
					Used: 3316023296,
					UsedPercent: 12.845021867013273,
				},
				{
					Available: 105379840,
					Device: '/dev/vda15',
					InodesUsedPercent: 0.0,
					Mountpoint: '/boot/efi',
					Size: 109422592,
					Used: 4042752,
					UsedPercent: 3.6946227704055845,
				},
				{
					Available: 0,
					Device: '/dev/loop3',
					InodesUsedPercent: 100.0,
					Mountpoint: '/snap/snapd/11588',
					Size: 33947648,
					Used: 33947648,
					UsedPercent: 100.0,
				},
				{
					Available: 0,
					Device: '/dev/loop4',
					InodesUsedPercent: 100.0,
					Mountpoint: '/snap/core18/1997',
					Size: 58195968,
					Used: 58195968,
					UsedPercent: 100.0,
				},
				{
					Available: 0,
					Device: '/dev/loop5',
					InodesUsedPercent: 100.0,
					Mountpoint: '/snap/lxd/19647',
					Size: 73924608,
					Used: 73924608,
					UsedPercent: 100.0,
				},
				{
					Available: 0,
					Device: '/dev/loop6',
					InodesUsedPercent: 100.0,
					Mountpoint: '/snap/lxd/20326',
					Size: 70909952,
					Used: 70909952,
					UsedPercent: 100.0,
				},
				{
					Available: 0,
					Device: '/dev/loop2',
					InodesUsedPercent: 100.0,
					Mountpoint: '/snap/snapd/11841',
					Size: 33685504,
					Used: 33685504,
					UsedPercent: 100.0,
				},
				{
					Available: 0,
					Device: '/dev/loop0',
					InodesUsedPercent: 100.0,
					Mountpoint: '/snap/core18/2066',
					Size: 58195968,
					Used: 58195968,
					UsedPercent: 100.0,
				},
			],
			Memory: {
				Available: 1.37439e11,
				Free: 135958400000,
				Total: 1.37439e11,
				Used: between(DFInt('UsedMemoryMin'), DFInt('UsedMemoryMax')) /* between(1, 1.37439e11) */,
			},
			Timestamp: now('nano'),
			Uptime: 1895705,
		});
	},
};

const now = (unit: string) => {
	const hrTime = process.hrtime();

	switch (unit) {
		case 'milli':
			return hrTime[0] * 1000 + hrTime[1] / 1000000;

		case 'micro':
			return hrTime[0] * 1000000 + hrTime[1] / 1000;

		case 'nano':
		default:
			return hrTime[0] * 1000000000 + hrTime[1];
	}
};

function between(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
