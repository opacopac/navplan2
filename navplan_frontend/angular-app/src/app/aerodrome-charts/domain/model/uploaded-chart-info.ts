export class UploadedChartInfo {
    constructor(
        public success: boolean,
        public message: string,
        public filename: string,
        public type: string,
        public url: string,
    ) {
    }
}
