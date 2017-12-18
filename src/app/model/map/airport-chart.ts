export interface AirportChartRestItem {
    id: number;
    source: string;
    type: string;
    filename: string;
    mercator_n: string;
    mercator_s: string;
    mercator_e: string;
    mercator_w: string;
}


export class AirportChart {
    id: number;
    source: string;
    type: string;
    filename: string;
    mercator_n: string; // TODO: => extent
    mercator_s: string;
    mercator_e: string;
    mercator_w: string;

    constructor(restItem: AirportChartRestItem) {
        this.id = restItem.id;
        this.source = restItem.source;
        this.type = restItem.type;
        this.filename = restItem.filename;
        this.mercator_n = restItem.mercator_n;
        this.mercator_s = restItem.mercator_s;
        this.mercator_e = restItem.mercator_e;
        this.mercator_w = restItem.mercator_w;
    }
}
