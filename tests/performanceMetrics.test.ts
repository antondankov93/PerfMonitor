import { PerformanceMetrics } from '../src';

describe('PerformanceMetrics', () => {
    it('should collect core vitals', (done) => {
        const metrics = new PerformanceMetrics({
            reportToConsole: true,
            customReporter: (metric) => {
                expect(metric).toHaveProperty('name');
                expect(metric).toHaveProperty('value');
                done();
            },
        });

        metrics.startCoreVitals();
    });

    it('should measure custom event duration', async () => {
        const metrics = new PerformanceMetrics({ reportToConsole: false });
        const result = await metrics.measureCustomEvent('API Call', async () => {
            return new Promise((resolve) => setTimeout(resolve, 100));
        });

        expect(result.name).toBe('API Call');
        expect(result.duration).toBeGreaterThan(90);
    });
});