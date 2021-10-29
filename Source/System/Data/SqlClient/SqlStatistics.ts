export class SqlStatistics {
	public static StartTimer(statistics: SqlStatistics): SqlStatistics {
		if (statistics !== null && !statistics.RequestExecutionTimer()) {
			statistics = null;
		}
		return statistics;
	}

	public static StopTimer(statistics: SqlStatistics): void {
		if (statistics !== null) {
			statistics.ReleaseAndUpdateExecutionTimer();
		}
	}

	public get WaitForDoneAfterRow() {
		return this._waitForDoneAfterRow;
	}

	public set WaitForDoneAfterRow(value: bool) {
		this._waitForDoneAfterRow = value;
	}

	public get WaitForReply() {
		return this._waitForReply;
	}

	public constructor() {}

	public ContinueOnNewConnection() {
		this._startExecutionTimestamp = 0;
		this._startFetchTimestamp = 0;
		this._waitForDoneAfterRow = false;
		this._waitForReply = false;
	}

	public RequestExecutionTimer() {
		if (this._startExecutionTimestamp === 0) {
			this._startExecutionTimestamp = process.uptime();
			return true;
		}
		return false;
	}

	public RequestNetworkServerTimer() {
		if (this._startNetworkServerTimestamp === 0) {
			this._startNetworkServerTimestamp = process.uptime();
		}
		this._waitForReply = true;
	}

	public ReleaseAndUpdateExecutionTimer() {
		if (this._startExecutionTimestamp > 0) {
			this._executionTime += process.uptime() - this._startExecutionTimestamp;
			this._startExecutionTimestamp = 0;
		}
	}

	public ReleaseAndUpdateNetworkServerTimer() {
		if (this._waitForReply && this._startNetworkServerTimestamp > 0) {
			this._networkServerTime += process.uptime() - this._startNetworkServerTimestamp;
			this._startNetworkServerTimestamp = 0;
		}
		this._waitForReply = false;
	}

	public SafeAdd(value: long, summand: long) {
		if (9223372036854775807n - <bigint>(<unknown>value) > summand) {
			value += summand;
			return;
		}
		(<bigint>(<unknown>value)) += 9223372036854775807n;
	}

	public SafeIncrement(value: long) {
		if (value < 9223372036854775807n) {
			value += 1;
		}
		return value;
	}

	public UpdateStatistics() {}

	public _startExecutionTimestamp: long;
	public _executionTime: long;
	public _startFetchTimestamp: long;
	public _startNetworkServerTimestamp: long;
	public _networkServerTime: long;

	private _waitForDoneAfterRow: bool;
	private _waitForReply: bool;
}
