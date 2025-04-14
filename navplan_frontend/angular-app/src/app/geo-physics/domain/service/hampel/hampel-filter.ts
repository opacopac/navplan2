export class HampelFilter {

    /**
     * Example usage:
     *     const sensorSpeeds = [10, 12, 14, 100, 15, 13, 11, 90, 12, 14];  // Example sensor speed data
     *     const windowSize = 3;
     *     const threshold = 3;
     *
     *     const filteredSpeeds = filter(sensorSpeeds, windowSize, threshold);
     *     console.log(filteredSpeeds);
     */
    public static filter(data: number[], windowSize: number, threshold: number): number[] {
        const halfWindow = Math.floor(windowSize / 2);
        const filteredData: number[] = [];  // Initialize an empty array to store the filtered data

        for (let i = 0; i < data.length; i++) {
            const start = Math.max(0, i - halfWindow);
            const end = Math.min(data.length - 1, i + halfWindow);
            const window = data.slice(start, end + 1);

            const median = this.getMedian(window);
            const mad = this.getMAD(window, median);
            const deviation = Math.abs(data[i] - median);

            if (deviation <= threshold * mad) {
                filteredData.push(data[i]);  // Only keep the data point if it's not an outlier
            } else {
                // console.log(`Outlier detected at index ${i}: ${data[i]} (median: ${median}, MAD: ${mad})`);
            }
        }

        return filteredData;
    }


    private static getMedian(arr: number[]): number {
        const sortedArr = [...arr].sort((a, b) => a - b);
        const mid = Math.floor(sortedArr.length / 2);

        if (sortedArr.length % 2 === 0) {
            return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
        } else {
            return sortedArr[mid];
        }
    }


    private static getMAD(arr: number[], median: number): number {
        const deviations = arr.map(value => Math.abs(value - median));
        return this.getMedian(deviations);
    }
}
