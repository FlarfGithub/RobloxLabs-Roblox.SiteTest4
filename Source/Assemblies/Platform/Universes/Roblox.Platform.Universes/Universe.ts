import { IUniverse } from './IUniverse';

export class Universe implements IUniverse {
	public Name: String;
	public Id: Number;

	public static GetById(universeId: number): IUniverse {
		const universe = new Universe();
		universe.Id = universeId;
		universe.Name = 'test';
		return universe;
	}
}
