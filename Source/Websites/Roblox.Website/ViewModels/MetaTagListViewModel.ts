export interface IMetaTagListViewModel {
	FacebookMetaTags?: Record<string, string>;
	TwitterMetaTags?: Record<string, string>;
	StructuredDataTags?: IStructuredDataTagModel;
	Description: string;
	Keywords: string;
	NoIndexNoFollow: bool;
	NoIndex: bool;
	NoFollow: bool;
	IncludeReferrerOriginTag: bool;
	GoogleSiteVerificationTag: null;
}

export interface IStructuredDataTagModel {
	StructuredDataContext: string;
	StructuredDataType: string;
	StructuredDataName: string;
	RobloxUrl: string;
	RobloxLogoUrl: string;
	RobloxFacebookUrl: string;
	RobloxTwitterUrl: string;
	RobloxLinkedInUrl: string;
	RobloxInstagramUrl: string;
	RobloxYouTubeUrl: string;
	RobloxGooglePlusUrl: string;
	RobloxTwitchTvUrl: string;
	Title: string;
	Description: string;
	Images: string[];
	ImageWidth: int;
	ImageHeight: int;
}
