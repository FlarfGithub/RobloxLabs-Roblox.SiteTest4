//------------------------------------------------------------------------------
// <copyright file="INotifyPropertyChanged.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------

import { PropertyChangedEventHandler } from './PropertyChangedEventHandler';

export interface INotifyPropertyChanged {
	/* PropertyChangedEventHandler */ PropertyChanged: PropertyChangedEventHandler;
}
