//------------------------------------------------------------------------------
// <copyright file="PropertyChangedEventHandler.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------

import { PropertyChangedEventArgs } from './PropertyChangedEventArgs';

/**
 * Represents the method that will handle the 'PropertyChanged'event raised when a property is changed on a component.
 */
export type PropertyChangedEventHandler = (sender: object, e: PropertyChangedEventArgs) => void;
