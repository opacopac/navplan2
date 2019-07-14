export class AirportChart {
    constructor(
        public id: number,
        public source: string,
        public type: string,
        public filename: string,
        public mercator_n: string, // TODO: => extent
        public mercator_s: string,
        public mercator_e: string,
        public mercator_w: string) {
    }
}
