export interface IRestFlightrouteWaypoint {
    type: string;
    freq: string;
    callsign: string;
    checkpoint: string;
    airport_icao: string;
    latitude: number;
    longitude: number;
    alt: number;
    isminalt: number;
    ismaxalt: number;
    isaltatlegstart: number;
    remark: string;
    supp_info: string;
}
