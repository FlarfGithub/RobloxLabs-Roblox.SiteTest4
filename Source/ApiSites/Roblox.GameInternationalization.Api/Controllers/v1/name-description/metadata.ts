export default {
	method: 'all',
	func: async (_req, res) => {
		res.send({
			isNameDescriptionMigrationEnabled: true,
		});
	},
};
