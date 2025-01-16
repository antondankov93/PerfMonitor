import { collectCoreVitals, Metric } from './coreVitals';
import { measureCustomEvent, CustomMetric } from './customMetrics';

export interface PerformanceOptions {
    reportToConsole?: boolean;
    customReporter?: (metric: Metric | CustomMetric) => void;
}

export class PerformanceMetrics {
    private options: PerformanceOptions;

    constructor(options: PerformanceOptions = {}) {
        this.options = options;
    }

    startCoreVitals() {
        collectCoreVitals(this.reportMetric.bind(this));
    }

    measureCustomEvent<T>(eventName: string, callback: () => Promise<T>) {
        return measureCustomEvent(eventName, callback).then(this.reportMetric.bind(this));
    }

    private reportMetric(metric: Metric | CustomMetric) {
        if (this.options.reportToConsole) {
            console.log(`[PerformanceMetrics] ${metric.name}: ${metric.value || metric.duration}ms`);
        }
        if (this.options.customReporter) {
            this.options.customReporter(metric);
        }
    }
}