/// <reference types="Assemblies/System" />

type Int64 = System.Int64;
type Int32 = System.Int32;

declare namespace Roblox.AbTesting.Api.Models.Request {
	class EnrollmentStatusResponseModel {
		public SubjectType: SubjectType;
		public SubjectTargetId: Int64;
		public ExperimentName: String;
		public Status: String;
		public Variation: Int32;
	}
}
