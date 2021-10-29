export interface GetByUserNameResponse {
	Success?: bool;
	ErrorMessage?: string;
	ID: long;
	Username: string;
	AvatarURI?: null;
	AvatarFinal: bool;
	IsOnline: bool;
}
