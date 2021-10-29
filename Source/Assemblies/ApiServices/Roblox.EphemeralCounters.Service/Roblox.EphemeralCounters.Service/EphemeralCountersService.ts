import { Response } from 'express';
import { Counter } from '../../../Data/Counters/Roblox.Data.Counters/Counter';
import { Sequence } from '../../../Data/Counters/Roblox.Data.Counters/Sequence';
import { ISequencesItem } from '../../../../Services/Roblox.EphemeralCounters.Service/ISequencesItem';
import { ICounter } from '../../../../Services/Roblox.EphemeralCounters.Service/Models/ICounter';

export namespace EphemeralCountersService {
	export async function HandleBatchSequences(sequences: ISequencesItem[], response: Response) {
		sequences.forEach(async (sequence) => {
			await IncrementSequence(sequence.Name, sequence.Context, sequence.Action, sequence.Value);
		});
		response.status(200).send();
	}

	export async function HandleIncrementCounter(counter: string, amount: number, response: Response) {
		if (!(await IncrementCounter(counter, amount))) {
			// TODO Implement a ServiceError here.
			return response.status(500).send({
				Message: 'An error has occurred.',
			});
		}

		return response.status(200).send();
	}

	export async function HandleBatchIncrementCounters(counters: ICounter[], response: Response) {
		counters.forEach(async (counter) => {
			await IncrementCounter(counter.Name, counter.Amount);
		});
		response.status(200).send();
	}

	export async function IncrementCounter(counter: string, amount: number) {
		const didIncrement = await Counter.CreateOrIncrementCounter(counter, amount);
		return didIncrement;
	}

	export async function IncrementSequence(name: string, context: string, action: string, value: number) {
		const didUpdate = await Sequence.IncrementOrCreate(context, name, action, value);
		return didUpdate;
	}
}
