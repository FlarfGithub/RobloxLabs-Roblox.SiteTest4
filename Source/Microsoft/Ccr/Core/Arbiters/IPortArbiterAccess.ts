import { IPortElement } from './IPortElement';
import { PortMode } from './PortMode';

export interface IPortArbiterAccess {
	TestForElement(): IPortElement;
	TestForMultipleElements(count: int): IPortElement[];
	PostElement(element: IPortElement): void;
	Mode: PortMode;
}
