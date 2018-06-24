import { Position2d } from '../geometry/position2d';
import { Navaid } from '../navaid';


export interface NavaidRestItem {
    id: number;
    type: string;
    kuerzel: string;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    frequency: string;
    unit: string;
    declination: number;
    truenorth: boolean;
}


export class RestMapperNavaid {
    public static getNavaidFromRestItem(restItem: NavaidRestItem): Navaid {
        return new Navaid(
            restItem.id,
            restItem.type,
            restItem.kuerzel,
            restItem.name,
            new Position2d(restItem.longitude, restItem.latitude),
            restItem.elevation,
            restItem.frequency,
            restItem.unit,
            restItem.declination,
            restItem.truenorth);
    }
}
