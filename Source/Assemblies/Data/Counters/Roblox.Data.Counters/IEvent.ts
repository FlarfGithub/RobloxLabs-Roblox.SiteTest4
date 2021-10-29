/**
 * This defines the IEvent entity for Roblox.Analytics and Roblox.Data.Counters
 */
export interface IEvent {
	/*Int64*/ Id: System.Int64 /* PK, AI */;
	/* ServiceContext: The Service Context, usually in the url, like 'www/e.png', refer to the table 'RobloxAnalytics.ServiceContext' for a list of available contexts */
	/*Int32*/ ServiceContext: System.Int32 /* NN, FK */;
	/* EventContext: The event context, given with the param 'ctx' */
	/*String*/ EventContext: System.String /* NN */;
	/* EventName: The event name, given with the param 'evt' */
	/*String*/ EventName: System.String /* NN */;
	/* URL: The event url, given with the param 'url', CAN BE NULL */
	/*String*/ URL: System.String;
	/* DateRecorded: The original date that the event was recorded. */
	/*DateTime*/ DateRecorded: System.DateTime /* NN */;
	/* LastDateRecorded: The last date that this event was fired. */
	/*DateTime*/ LastDateRecorded: System.DateTime /* NN */;
	/* AdditionalArguments: A JSON Object containing key-value pairs for the other values in the request. */
	/*Sql<JSON>*/ AdditionalArguments: System.String /* NN */;
	/* Count: The count of how many times this event has been fired. */
	/*Int64*/ Count: System.Int64 /* NN */;
}
