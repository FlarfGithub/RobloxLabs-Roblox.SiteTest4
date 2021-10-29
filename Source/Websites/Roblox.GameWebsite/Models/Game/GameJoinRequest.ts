export interface GameJoinRequest {
	requestType: string;
	placeId: long;
	isPartyLeader: bool;
	isPlayTogetherGame: bool;
}
