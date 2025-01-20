import { getTTFB } from 'web-vitals';

export function getTBT(callback: (metric: Metric) => void) {
    getTTFB((metric) => callback({ name: 'TBT', value: metric.value }));
    // Note: This uses getTTFB as a placeholder.
    // You'll need to implement actual TBT calculation.
}