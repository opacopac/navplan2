export class SearchItemList {
    public items: SearchItem[] = [];
}


export class SearchItem {

    constructor(
        public type: string, // TODO: types...
        public id: string,
        public name: string,
        public wpname: string,
        public country: string,
        public admin1: string,
        public admin2: string,
        public frequency: string,
        public callsign: string,
        public airport_icao: string,
        public latitude: number,
        public longitude: number,
        public elevation: number) {
    }
}
