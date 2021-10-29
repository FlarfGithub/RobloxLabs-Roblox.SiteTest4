import { ISupportedLocale } from './ISupportedLocale';

/**
 * Model for Supported locale with user locus information
 */
export interface ISupportedLocaleLocus {
	/**
	 * Supported locale
	 */
	locale: ISupportedLocale;
	/**
	 * Is locale enabled for full experience
	 */
	isEnabledForFullExperience: boolean;
	/**
	 * Is locale enabled for signup and login
	 */
	isEnabledForSignupAndLogin: boolean;
	/**
	 * Is locale enabled for in game ugc
	 */
	isEnabledForInGameUgc: boolean;
}
