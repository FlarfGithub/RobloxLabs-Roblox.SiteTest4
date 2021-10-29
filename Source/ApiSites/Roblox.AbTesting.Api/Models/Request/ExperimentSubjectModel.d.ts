/// <reference types="Assemblies/System" />

declare namespace Roblox.AbTesting.Api.Models.Request {
	class ExperimentSubjectModel {
		public SubjectType: SubjectType;
		public SubjectTargetId: Int64;
		public ExperimentName: String;
	}
}
