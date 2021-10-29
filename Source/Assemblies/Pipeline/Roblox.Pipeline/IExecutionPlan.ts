import { Task } from '../../../System/Threading/Task';
import { IPipelineHandler } from './IPipelineHandler';

export interface IExecutionPlan<TInput, TOutput> {
	Handlers: IPipelineHandler<TInput, TOutput>[];
	RemoveHandler(index: int): void;
	AppendHandler(handler: IPipelineHandler<TInput, TOutput>): void;
	PrependHandler(handler: IPipelineHandler<TInput, TOutput>): void;
	AddHandlerAfter(index: int, handler: IPipelineHandler<TInput, TOutput>): void;
	AddHandlerBefore(index: int, handler: IPipelineHandler<TInput, TOutput>): void;
	InsertHandler(index: int, handler: IPipelineHandler<TInput, TOutput>): void;
	ClearHandlers(): void;
	Execute(input: TInput): TOutput;
	ExecuteAsync(input: TInput): Task<TOutput>;
}
