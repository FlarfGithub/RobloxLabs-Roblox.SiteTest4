import { Response } from 'express';
import { Page } from '../../../Services/Roblox.ClientSettings.Service/Models/Page';
import { PageRequest } from '../../../Services/Roblox.ClientSettings.Service/Models/PageRequest';
import { ClientSettings } from '../../Platform/ClientSettings/Roblox.Platform.ClientSettings/Implementation/ClientSettingsUtil';

export class ClientSettingsHandler {
	private _response;
	public constructor(response: Response) {
		this._response = response;
	}

	public HandleGetPage(request: PageRequest) {
		const partialResponse: Page = {
			TotalPageCount: 0,
			PageIndex: request.PageIndex,
			Settings: [],
		};

		// TODO Support greater than 10 requests here.
		const FSettings = ClientSettings.GetFSettings();
		FSettings.forEach((fsettingPage, idx) => {
			partialResponse.Settings.push({
				Key: fsettingPage,
				Value: idx.toString(),
			});
		});

		this._response.send(partialResponse);
	}
}
