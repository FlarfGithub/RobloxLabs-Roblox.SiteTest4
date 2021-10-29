import { Setting } from './Setting';

export interface Page {
	/*public int*/ PageIndex: System.Int32 | System.String;
	/*public int*/ TotalPageCount: System.Int32;
	/*public List<Setting>*/ Settings: Setting[];
}
