import { ILanguage } from './ILanguage';

/**
 * Model for Supported locale
 */
export interface ISupportedLocale {
	/**
	 * id of supported locale
	 */
	id: number;
	/**
	 * locale of supported locale. Example "en-us"
	 */
	locale: string;
	/**
	 * name of supported locale. Example "English(US)"
	 */
	name: string;
	/**
	 * Name of supported locale in native language. Example "English"
	 */
	nativeName: string;
	/**
	 * Language associated with Supported locale
	 */
	language: ILanguage;
}
