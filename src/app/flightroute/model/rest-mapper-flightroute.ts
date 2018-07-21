import {Position2d} from '../../shared/model/geometry/position2d';
import {Speed} from '../../shared/model/quantities/speed';
import {Consumption} from '../../shared/model/quantities/consumption';
import {Time} from '../../shared/model/quantities/time';
import {FlightrouteListEntry} from './flightroute-list-entry';
import {Flightroute} from './flightroute';
import {Aircraft} from './aircraft';
import {Waypoint} from './waypoint';
import {WaypointAltitude} from './waypoint-altitude';
import {ConsumptionUnit, SpeedUnit, TimeUnit} from '../../shared/model/units';
import {WaypointType} from './waypoint-type';


// region INTERFACES

export interface FlightrouteListResponse {
    navplanList: FlightrouteListEntryRest[];
}


export interface FlightrouteListEntryRest {
    id: number;
    title: string;
}


export interface FlightrouteResponse {
    navplan: {
        id: number,
        title: string,
        aircraft_speed: number,
        aircraft_consumption: number,
        extra_fuel: number,
        comments: string,
        waypoints: FlightrouteWaypointRest[],
        alternate: FlightrouteWaypointRest,
    };
}


export interface FlightrouteWaypointRest {
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

// endregion


export class RestMapperFlightroute {
    // region flightroute list

    public static getFlightrouteListFromResponse(response: FlightrouteListResponse): FlightrouteListEntry[] {
        if (!response.navplanList || response.navplanList.length === 0) {
            return [];
        }

        const flightrouteList: FlightrouteListEntry[] = [];
        for (let i = 0; i < response.navplanList.length; i++) {
            const listEntry = this.getFlightrouteListEntryFromResponse(response.navplanList[i]);
            flightrouteList.push(listEntry);
        }

        return flightrouteList;
    }


    private static getFlightrouteListEntryFromResponse(listEntry: FlightrouteListEntryRest): FlightrouteListEntry {
        return new FlightrouteListEntry(listEntry.id, listEntry.title);
    }

    // endregion


    // region flightroute

    public static getFlightrouteFromResponse(response: FlightrouteResponse): Flightroute {
        const aircraft = new Aircraft(
            new Speed(response.navplan.aircraft_speed, SpeedUnit.KT),
            new Consumption(response.navplan.aircraft_consumption, ConsumptionUnit.L_PER_H)
        );

        const waypoints: Waypoint[] = [];
        for (let i = 0; i < response.navplan.waypoints.length; i++) {
            const waypoint = this.getWaypointFromResponse(response.navplan.waypoints[i]);
            waypoints.push(waypoint);
        }

        let alternate: Waypoint;
        if (response.navplan.alternate) {
            alternate = this.getWaypointFromResponse(response.navplan.alternate);
        }

        return new Flightroute(
            response.navplan.id,
            response.navplan.title,
            response.navplan.comments,
            aircraft,
            waypoints,
            alternate,
            new Time(response.navplan.extra_fuel, TimeUnit.M)
        );
    }


    private static getWaypointFromResponse(entry: FlightrouteWaypointRest): Waypoint {
        return new Waypoint(
            WaypointType[entry.type],
            entry.freq,
            entry.callsign,
            entry.checkpoint,
            entry.remark,
            entry.supp_info,
            new Position2d(entry.longitude, entry.latitude),
            new WaypointAltitude(
                entry.alt,
                entry.isminalt === 1, // 0: false, 1: true
                entry.ismaxalt === 1, // 0: false, 1: true
                entry.isaltatlegstart === 1 // 0: false, 1: true
            )
        );
    }

    // endregion
}
