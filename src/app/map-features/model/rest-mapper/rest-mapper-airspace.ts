import { Polygon } from '../../../shared/model/geometry/polygon';
import { Airspace, AirspaceAltitude } from '../airspace';

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


export class RestMapperAirspace {
    public static getAirspaceFromRestItem(restItem: AirspaceRestItem): Airspace {
        return new Airspace(
            restItem.id,
            restItem.aip_id,
            restItem.category,
            restItem.country,
            restItem.name,
            { top: this.getAirspaceAltitudeFromRestItem(restItem.alt.top),
                bottom: this.getAirspaceAltitudeFromRestItem(restItem.alt.bottom) },
            Polygon.createFromArray(restItem.polygon));
    }


    private static getAirspaceAltitudeFromRestItem(restItem: AirspaceAltitudeRestItem): AirspaceAltitude {
        return new AirspaceAltitude(
            restItem.ref,
            restItem.height,
            restItem.unit);
    }
}
