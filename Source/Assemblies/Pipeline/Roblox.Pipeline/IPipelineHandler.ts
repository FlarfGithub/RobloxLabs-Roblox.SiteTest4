import { Task } from '../../../System/Threading/Task';
import { IExecutionContext } from './IExecutionContext';

export interface IPipelineHandler<TInput, TOutput> {
	NextHandler: IPipelineHandler<TInput, TOutput>;
	Invoke(context: IExecutionContext<TInput, TOutput>): void;
	InvokeAsync(context: IExecutionContext<TInput, TOutput>): Task<void>;
}
