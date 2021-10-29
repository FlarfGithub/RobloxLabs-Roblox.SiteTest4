export interface IPort {
	PostUnknownType(item: object): void;
	TryPostUnknownType(item: object): void;
}
