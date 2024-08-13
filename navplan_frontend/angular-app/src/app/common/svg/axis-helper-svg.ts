export class AxisHelperSvg {
    public static calculateScaleMarks(min: number, max: number, desiredMarks: number = 10): number[] {
        // 1. Determine the range
        const range = max - min;

        // 2. Approximate Step Size
        const approxStepSize = range / desiredMarks;

        // 3. Determine the magnitude
        const magnitude = Math.pow(10, Math.floor(Math.log10(approxStepSize)));

        // 4. Round the step size to a "nice" number
        let roundedStepSize: number;
        if (approxStepSize / magnitude < 1.5) {
            roundedStepSize = magnitude;
        } else if (approxStepSize / magnitude < 3) {
            roundedStepSize = 2 * magnitude;
        } else if (approxStepSize / magnitude < 7.5) {
            roundedStepSize = 5 * magnitude;
        } else {
            roundedStepSize = 10 * magnitude;
        }

        // 5. Calculate the first scale mark (rounding down to nearest multiple of step size)
        const startMark = Math.floor(min / roundedStepSize) * roundedStepSize;

        // 6. Generate the scale marks
        const scaleMarks: number[] = [];
        let mark = startMark;

        while (mark <= max) {
            scaleMarks.push(mark);
            mark += roundedStepSize;
        }

        // Ensure at least one scale mark after max
        if (scaleMarks[scaleMarks.length - 1] < max) {
            scaleMarks.push(mark);
        }

        return scaleMarks;
    }
}
