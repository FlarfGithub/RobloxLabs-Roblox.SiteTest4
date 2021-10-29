export default {
	method: 'all',
	func: async (_req, res) => {
		res.send({
			isFeatureEnabled: true,
			areAllLanguagesEnabled: true,
			minimumUniverseIdForFeature: 1,
			isHumanTranslationProgressUIEnabled: false,
			isAutomaticTranslationProgressUIEnabled: false,
			isSupportedLanguagesChildLocalesUIEnabled: true,
		});
	},
};
