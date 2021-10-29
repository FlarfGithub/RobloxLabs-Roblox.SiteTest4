import { MetricsType } from './Enumeration/MetricsType';

export interface MeasurementRequest {
	featureName: string;
	measureName: string;
	value: double;
	excludeCountry?: bool;
	metricsType?: MetricsType;
}
