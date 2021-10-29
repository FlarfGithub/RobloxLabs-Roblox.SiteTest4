/*
	FileName: datastores.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: DataStoreV2 API, Fetch DataStores for a given 'universeId'

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
import { Request, Response } from 'express-serve-static-core';

// IDataStoreRespose[] Roblox.Web.GamePersistence.GamePersistenceRequestProcessor.GetDataStoresForTheUniverse(IDataStoreRequest request)
// Request example:
/*
 
# Get all the datastores for the universe
GET /v2/persistence/<UNIVERSEIDGOESHERE>/datastores?prefix=<PREFIXGOESHERE>&maxItemsToReturn=<PAGESIZEGOESHERE>&exclusiveStartKey=<PAGECURSORGOESHERE> HTTP/1.1
Host: gamepersistence.sitetest4.robloxlabs.com
Cookie: <SECURITYTOKENGOESHERE>
Roblox-Place-Id: <PLACEIDGOESHERE>

# Response

HTTP/1.1 200 OK
content-type: application/json; charset=utf-8

{
  "datastores": [
    {
      "name": "<DATASTORENAMEGOESHERE>",
      "createdTime": "<ISOCREATEDTIMEGOESHERE>",
      "updatedTime": "<ISOLASTUPDATEDTIMEGOESHERE>",
      "versioningEnabled": <% Roblox.ClientSettings.IsFeatureEnabled("DataStoreVersioning", "WebST4") %>
    }
  ],
  "lastReturnedKey": <PAGECURSORGOESHERE>
}
 */

/*
{
	"dataStores": IDataStoreRespose[],
	"lastReturnedKey": String,
}
*/

/* 
For the DataStore team:

If the maxItemsToReturn is 0, then it will return the first 50 DataStores found on DB74
If the prefix is null or empty, then it will return all stores without any filtering
The page cursor will be based on the universeId in the given request, eg. beta_<LASTRETURNEDDATASTORENAMEGOESHERE>_s+<SOMEBASE64KEY>
After 20 minutes, or server retart, the page will be purged and a new page will be supplied.

*/

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		return response.send({});
	},
};
