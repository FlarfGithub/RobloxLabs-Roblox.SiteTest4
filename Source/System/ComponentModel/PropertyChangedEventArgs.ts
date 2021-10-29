//------------------------------------------------------------------------------
// <copyright file="PropertyChangedEventArgs.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------

import { EventArgs } from '../EventArgs';

export class PropertyChangedEventArgs extends EventArgs {
	private readonly propertyName: string;

	/**
	 * Initializes a new instance of the 'System.ComponentModel.PropertyChangedEventArgs' class.
	 */
	public constructor(propertyName: string) {
		super();
		this.propertyName = propertyName;
	}

	public get PropertyName() {
		return this.propertyName;
	}
}
