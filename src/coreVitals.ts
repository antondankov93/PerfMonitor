import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

export interface Metric {
    name: string;
    value: number;
}

export function collectCoreVitals(callback: (metric: Metric) => void) {
    getCLS((metric) => callback({ name: 'CLS', value: metric.value }));
    getFID((metric) => callback({ name: 'FID', value: metric.value }));
    getLCP((metric) => callback({ name: 'LCP', value: metric.value }));
    getFCP((metric) => callback({ name: 'FCP', value: metric.value }));
    getTTFB((metric) => callback({ name: 'TTFB', value: metric.value }));
}