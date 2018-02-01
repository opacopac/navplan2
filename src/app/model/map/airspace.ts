import { Polygon } from '../polygon';


export interface AirspaceRestItem {
    id: number;
    aip_id: number;
    category: string;
    country: string;
    name: string;
    alt: { top: AirspaceAltitudeRestItem, bottom: AirspaceAltitudeRestItem };
    polygon: [number, number][];
}


export interface AirspaceAltitudeRestItem {
    ref: string;
    height: number;
    unit: string;
}


export class Airspace {
    id: number;
    aip_id: number;
    category: string;
    country: string;
    name: string;
    alt: { top: AirspaceAltitude, bottom: AirspaceAltitude };
    polygon: Polygon;


    constructor(restItem: AirspaceRestItem) {
        this.id = restItem.id;
        this.aip_id = restItem.aip_id;
        this.category = restItem.category;
        this.country = restItem.country;
        this.name = restItem.name;
        this.alt = { top: undefined, bottom: undefined };
        this.alt.top = new AirspaceAltitude(restItem.alt.top);
        this.alt.bottom = new AirspaceAltitude(restItem.alt.bottom);
        this.polygon = Polygon.createFromLonLatList(restItem.polygon);
    }
}


export class AirspaceAltitude {
    ref: string;
    height: number;
    unit: string;

    constructor(restItem: AirspaceAltitudeRestItem) {
        this.ref = restItem.ref;
        this.height = restItem.height;
        this.unit = restItem.unit;
    }
}
