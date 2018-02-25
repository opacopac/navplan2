export interface GeonameRestItem {
    id: string;
    name: string;
    feature_class: string;
    feature_code: string;
    country: string;
    admin1: string;
    admin2: string;
    population: string;
    latitude: string;
    longitude: string;
    elevation: string;
}


export class RestMapperGeoname {
    public static getGeonameFromRestItem(restItem: GeonameRestItem) {
        // TODO
    }
}
