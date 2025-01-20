import { collectCoreVitals, Metric } from './coreVitals';
import { measureCustomEvent, CustomMetric } from './customMetrics';
import { getTBT } from './metrics/tbt';
import { getResourceTiming, ResourceTimingMetric } from './metrics/resourceTiming';

export interface PerformanceOptions {
    reportToConsole?: boolean;
    customReporter?: (metric: Metric | CustomMetric | ResourceTimingMetric) => void;
    clsThreshold?: number;
    fidThreshold?: number;
    lcpThreshold?: number;
}

export class PerformanceMetrics {
    private options: PerformanceOptions;

    constructor(options: PerformanceOptions = {}) {
        this.options = options;
    }

    startCoreVitals() {
        collectCoreVitals(this.reportMetric.bind(this));
        getTBT(this.reportMetric.bind(this));
    }

    measureCustomEvent<T>(eventName: string, callback: () => Promise<T>) {
        return measureCustomEvent(eventName, callback).then(this.reportMetric.bind(this));
    }

    measureResourceTiming(resourceUrl: string) {
        getResourceTiming(resourceUrl).then(this.reportMetric.bind(this));
    }

    private reportMetric(metric: Metric | CustomMetric | ResourceTimingMetric) { // Update type here
        const { name, value, duration } = metric;
        const metricValue = value || duration;

        if (this.options.reportToConsole) {
            console.log(`[PerformanceMetrics] ${name}: ${metricValue}ms`);
            if (name === 'ResourceTiming') {
                console.log('Resource URL:', (metric as ResourceTimingMetric).url);
            }
        }

        if (this.options.customReporter) {
            this.options.customReporter(metric);
        }

        if (name === 'CLS' && this.options.clsThreshold && value > this.options.clsThreshold) {
            console.warn(`CLS exceeded threshold: ${value} > ${this.options.clsThreshold}`);
        }
    }
}