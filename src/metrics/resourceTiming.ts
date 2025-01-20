import {Metric} from "../coreVitals";

export interface ResourceTimingMetric extends Metric {
    url: string;
}

export function getResourceTiming(url: string): Promise<ResourceTimingMetric> {
    return new Promise((resolve, reject) => {
        const entry = performance.getEntriesByName(url)[0];
        if (entry) {
            resolve({
                name: 'ResourceTiming',
                value: entry.duration,
                url: url,
            });
        } else {
            reject(new Error(`Resource not found: ${url}`));
        }
    });
}