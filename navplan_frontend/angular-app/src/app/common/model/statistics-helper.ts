export class StatisticsHelper {
    public static movingAverage(values: number[], windowSize: number): number[] {
        if (windowSize <= 0) {
            throw new Error('Window size must be greater than zero.');
        }
        if (values.length < windowSize) {
            throw new Error('Window size must be less than or equal to the length of the values array.');
        }

        const result: number[] = [];
        let windowSum = 0;

        // Initialize the sum of the first window
        for (let i = 0; i < windowSize; i++) {
            windowSum += values[i];
        }

        // Add the average of the first window to the result
        result.push(windowSum / windowSize);

        // Slide the window over the values array
        for (let i = windowSize; i < values.length; i++) {
            // Subtract the element that is no longer in the window
            windowSum -= values[i - windowSize];
            // Add the new element that has entered the window
            windowSum += values[i];
            // Add the average to the result array
            result.push(windowSum / windowSize);
        }

        return result;
    }
}
