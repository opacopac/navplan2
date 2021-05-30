export class ReadNotamByIcaoRequest {
    constructor(
        public airportIcao: string,
        public starttimestamp: number,
        public endtimestamp: number
    ) {
    }
}
