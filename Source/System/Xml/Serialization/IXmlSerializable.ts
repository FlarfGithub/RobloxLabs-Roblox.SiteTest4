import { XmlSchema } from '../Schema/XmlSchema';
import { XmlReader } from '../XmlReader';
import { XmlWriter } from '../XmlWriter';

export interface IXmlSerializable {
	GetSchema?(): XmlSchema;

	ReadXml?(reader: XmlReader): void;

	WriteXml?(writer: XmlWriter): void;
}
