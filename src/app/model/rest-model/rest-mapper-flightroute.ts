import {Waypointtype} from '../waypoint';
import {Position2d} from '../position';
import {Waypoint2} from '../flightroute-model/waypoint2';
import {WaypointAltitude2} from '../flightroute-model/waypoint-altitude2';
import {Flightroute2} from '../flightroute-model/flightroute2';
import {Aircraft2} from '../flightroute-model/aircraft2';
import {Speed} from '../units/speed';
import {ConsumptionUnit, SpeedUnit, TimeUnit} from '../../services/utils/unitconversion.service';
import {Consumption} from '../units/consumption';
import {Time} from '../units/time';
import {FlightrouteListEntry} from '../flightroute-model/flightroute-list-entry';


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
    isminalt: boolean;
    ismaxalt: boolean;
    isaltatlegstart: boolean;
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

    public static getFlightrouteFromResponse2(response: FlightrouteResponse): Flightroute2 {
        const flightroute = new Flightroute2(
            response.navplan.id,
            response.navplan.title,
            response.navplan.comments,
            new Time(response.navplan.extra_fuel, TimeUnit.M)
        );

        flightroute.aircraft = new Aircraft2(
            new Speed(response.navplan.aircraft_speed, SpeedUnit.KT),
            new Consumption(response.navplan.aircraft_consumption, ConsumptionUnit.L_PER_H)
        );

        const waypoints: Waypoint2[] = [];
        for (let i = 0; i < response.navplan.waypoints.length; i++) {
            const waypoint = this.getWaypointFromResponse2(response.navplan.waypoints[i]);
            waypoints.push(waypoint);
        }
        flightroute.waypointList.replaceList(waypoints);

        if (response.navplan.alternate) {
            flightroute.waypointList.alternate = this.getWaypointFromResponse2(response.navplan.alternate);
        }

        return flightroute;
    }


    private static getWaypointFromResponse2(entry: FlightrouteWaypointRest): Waypoint2 {
        const waypoint = new Waypoint2(
            Waypointtype[entry.type],
            entry.freq,
            entry.callsign,
            entry.checkpoint,
            entry.remark,
            entry.supp_info,
            new Position2d(entry.longitude, entry.latitude),
            new WaypointAltitude2(
                entry.alt,
                entry.isminalt === true, // 0: false, 1: true
                entry.ismaxalt === true, // 0: false, 1: true
                entry.isaltatlegstart === true // 0: false, 1: true
            )
        );

        return waypoint;
    }

    // endregion
}
