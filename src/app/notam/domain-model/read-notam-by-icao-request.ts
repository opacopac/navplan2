export class ReadNotamByIcaoRequest {
    constructor(
        public icaoList: string[],
        public starttimestamp: number,
        public endtimestamp: number
    ) {
    }
}
