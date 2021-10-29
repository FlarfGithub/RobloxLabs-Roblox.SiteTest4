/*
	FileName: enrollments.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Load Place info script
			
	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

// Roblox.Web.AbTesting.AbTestingRequestProcessor.TryEnrollToExperiments(String experimentName, IUser user, IBrowserTracker browserTracker, Boolean requireSecureUri)
// Request example:
/*
 
# Preflight
OPTIONS /v1/enrollments HTTP/1.1
Host: Roblox.Tests.Hosts.SecureAbTestingHost
access-control-request-method: POST
access-control-request-headers: content-type,x-csrf-token
origin: Roblox.Tests.Origins.SecureAbTestingOrigin
user-agent: Roblox.Tests.UserAgents.AntiAdditionBlockAgent

###

# Request
POST /v1/enrollments HTTP/1.1
Host: Roblox.Tests.Hosts.SecureAbTestingHost
x-csrf-token: Roblox.Tests.HardCodedData.HardCodedXsrfTokens.ST4
user-agent: Roblox.Tests.UserAgents.AntiAdditionBlockAgent
content-type: application/json
origin: Roblox.Tests.Origins.SecureAbTestingOrigin

[
	{
		"SubjectType":"BrowserTracker",
		"SubjectTargetId":"<BROWSERTRACKERIDGOESHERE>",
		"ExperimentName":"{Roblox.Data.AbTesting.Experiments.BrowserTrackerExperiments}"
	},
	{
		"SubjectType":"User",
		"SubjectTargetId":"<USERIDGOESHERE>",
		"ExperimentName":"{Roblox.Data.AbTesting.Experiments.UserExperiments}"
	}
]

*/

// Notes:
// If a query to Roblox.Data.AbTesting.Experiments.BrowserTrackerExperiments and Roblox.Data.AbTesting.Experiments.UserExperiments returns with no experiment,
// this doesn't mean that the experiment doesn't exist, it could be in Roblox.Data.AbTesting.Experiments.SharedExperiments.

import { Request, Response } from 'express-serve-static-core';
import { SubjectTypeEnum } from '../../../../Assemblies/Platform/AbTesting/Roblox.Platform.AbTesting/SubjectTypeEnum';
import { IUser } from '../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/IUser';
import { IBrowserTracker } from '../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/IBrowserTracker';
import { AbTestingRequestProcessor } from '../../../../Assemblies/Web/AbTesting/Roblox.Web.AbTesting/AbTestingRequestProcessor';
import { UserModelBuildersClubMembershipTypeEnum } from '../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/UserModelBuildersClubMembershipTypeEnum';
import { FASTFLAG, FFlag } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';

FASTFLAG('RequireGlobalHTTPS');

// Refactor this to allow it to have multiple browser trackers?
// Multiple userIds wouldn't make sense as you can't have more than one account per auth token
export default {
	method: 'All',
	func: async (request: Request, response: Response): Promise<Response<unknown> | void> => {
		if (request.method === 'OPTIONS') return response.status(200).send();
		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
			return response.status(403).send({
				errors: [
					{
						code: 0,
						message: 'HTTPS Required',
					},
				],
			});

		if (request.method !== 'POST')
			return response.status(405).send({
				errors: [
					{
						code: 0,
						message: `The requested resource does not support http method '${request.method}'.`,
					},
				],
			});

		if (JSON.stringify(request.body) === '{}')
			return response.status(400).send({
				errors: [
					{
						code: 0,
						message: 'BadRequest',
					},
				],
			});

		if (request.body && (!request.headers['content-type'] || request.headers['content-type'].length === 0))
			return response.status(415).send({
				errors: [
					{
						code: 0,
						message:
							"The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.",
					},
				],
			});
		let cookie = request.headers.cookie;
		if (cookie === undefined) cookie = '';
		cookie = (cookie as string).split(';').find((AuthToken) => {
			return AuthToken.startsWith(' .ROBLOSECURITY') || AuthToken.startsWith('.ROBLOSECURITY');
		});
		if (cookie) cookie = cookie.split('=')[1];

		if (Array.isArray(request.body) && request.body.length === 0)
			return response.status(400).send({
				errors: [
					{
						code: 0,
						message: 'BadRequest',
					},
				],
			});

		const experiments = [];
		let user: IUser = null;
		let browsertracker: IBrowserTracker = null;
		let requestInvalid = false;
		if (Array.isArray(request.body))
			request.body.forEach((element) => {
				if (element.SubjectType !== undefined && element.SubjectTargetId !== undefined && element.ExperimentName !== undefined) {
					if (isNaN(parseInt(element.SubjectTargetId.toString()))) requestInvalid = true;

					if (element.SubjectType === SubjectTypeEnum.User || element.SubjectType.toString().toLowerCase() === 'user') {
						user = <IUser>{};
						user.Id = parseInt(element.SubjectTargetId.toString());
						user.SecurityToken = cookie;
						user.Name = '';
						user.MembershipType = UserModelBuildersClubMembershipTypeEnum.None;
						experiments.push({ Name: element.ExperimentName, Type: SubjectTypeEnum.User });
					} else if (
						element.SubjectType === SubjectTypeEnum.BrowserTracker ||
						element.SubjectType.toString().toLowerCase() === 'browsertracker'
					) {
						browsertracker = <IBrowserTracker>{};

						browsertracker.BrowserTrackerId = parseInt(element.SubjectTargetId.toString());
						browsertracker.IpAddress = request.ip;
						experiments.push({ Name: element.ExperimentName, Type: SubjectTypeEnum.BrowserTracker });
					}
				}
			});
		if (requestInvalid)
			return response.status(400).send({
				errors: [
					{
						code: 0,
						message: 'BadRequest',
					},
				],
			});
		const [successFull, message, code] = await AbTestingRequestProcessor.TryEnrollToExperiments(
			experiments,
			user,
			browsertracker,
			request.secure && FFlag['RequireGlobalHTTPS'],
		);
		if (successFull && message) {
			response.send(JSON.parse(<string>message));
		} else {
			response.status(<number>code).send({ errors: [{ code: code, message: message }] });
		}
	},
};
