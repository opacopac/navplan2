import { Geoname } from '../geoname';
import { Position2d } from '../position';


export interface GeonameRestItem {
    id: string;
    name: string;
    feature_class: string;
    feature_code: string;
    country: string;
    admin1: string;
    admin2: string;
    population: number;
    latitude: number;
    longitude: number;
    elevation: number;
}


export class RestMapperGeoname {
    public static getGeonameFromRestItem(restItem: GeonameRestItem) {
        return new Geoname(
            restItem.id,
            restItem.name,
            restItem.feature_class,
            restItem.feature_code,
            restItem.country,
            restItem.admin1,
            restItem.admin2,
            restItem.population,
            new Position2d(restItem.longitude, restItem.latitude),
            restItem.elevation
        );
    }
}
