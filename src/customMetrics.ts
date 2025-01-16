export interface CustomMetric {
    name: string;
    duration: number;
}

export function measureCustomEvent<T>(
    eventName: string,
    callback: () => Promise<T>
): Promise<CustomMetric> {
    const startTime = performance.now();
    return callback().then((result) => {
        const duration = performance.now() - startTime;
        return { name: eventName, duration };
    });
}