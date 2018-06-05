import { Waypoint, Waypointaltitude, Waypointtype } from "../waypoint";
import { Flightroute } from "../flightroute";
import { Position2d } from "../position";
import { Aircraft } from "../aircraft";
import {Waypoint2} from "../flightroute-model/waypoint2";
import {WaypointAltitude2} from "../flightroute-model/waypoint-altitude2";
import {Flightroute2} from "../flightroute-model/flightroute2";
import {Aircraft2} from "../flightroute-model/aircraft2";
import {Speed} from "../units/speed";
import {ConsumptionUnit, SpeedUnit} from "../../services/utils/unitconversion.service";
import {Consumption} from "../units/consumption";


// region INTERFACES

export interface FlightrouteListResponse {
    navplanList: FlightrouteListEntry[];
}

export interface FlightrouteListEntry {
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
        waypoints: FlightrouteWaypoint[],
        alternate: FlightrouteWaypoint,
    };
}

export interface FlightrouteWaypoint {
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
    public static getFlightrouteListFromResponse(response: FlightrouteListResponse): Flightroute[] {
        if (!response.navplanList || response.navplanList.length === 0) {
            return [];
        }

        const flightrouteList: Flightroute[] = [];
        for (let i = 0; i < response.navplanList.length; i++) {
            const entry: FlightrouteListEntry = response.navplanList[i];
            const flightroute = new Flightroute(
                entry.id,
                entry.title);
            flightrouteList.push(flightroute);
        }

        return flightrouteList;
    }


    public static getFlightrouteFromResponse(response: FlightrouteResponse): Flightroute {
        const flightroute: Flightroute = new Flightroute(
            response.navplan.id,
            response.navplan.title,
            response.navplan.comments,
        );

        flightroute.aircraft = new Aircraft(
            response.navplan.aircraft_speed,
            response.navplan.aircraft_consumption
        );

        for (let i = 0; i < response.navplan.waypoints.length; i++) {
            const waypoint = this.getWaypointFromResponse(response.navplan.waypoints[i]);
            flightroute.waypoints.push(waypoint);
        }

        if (response.navplan.alternate) {
            flightroute.alternate = this.getWaypointFromResponse(response.navplan.alternate);
        }

        return flightroute;
    }


    public static getFlightrouteFromResponse2(response: FlightrouteResponse): Flightroute2 {
        const flightroute = new Flightroute2(
            response.navplan.id,
            response.navplan.title,
            response.navplan.comments,
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
            flightroute.alternate = this.getWaypointFromResponse2(response.navplan.alternate);
        }

        return flightroute;
    }


    private static getWaypointFromResponse(entry: FlightrouteWaypoint): Waypoint {
        const waypoint = new Waypoint(
            Waypointtype[entry.type],
            entry.freq,
            entry.callsign,
            entry.checkpoint,
            entry.remark,
            entry.supp_info,
            new Position2d(entry.longitude,entry.latitude)
        );

        waypoint.alt = new Waypointaltitude(
            entry.alt,
            entry.isminalt == true, // 0: false, 1: true
            entry.ismaxalt == true, // 0: false, 1: true
            entry.isaltatlegstart == true // 0: false, 1: true
        );

        return waypoint;
    }


    private static getWaypointFromResponse2(entry: FlightrouteWaypoint): Waypoint2 {
        const waypoint = new Waypoint2(
            Waypointtype[entry.type],
            entry.freq,
            entry.callsign,
            entry.checkpoint,
            entry.remark,
            entry.supp_info,
            new Position2d(entry.longitude,entry.latitude),
            new WaypointAltitude2(
                entry.alt,
                entry.isminalt == true, // 0: false, 1: true
                entry.ismaxalt == true, // 0: false, 1: true
                entry.isaltatlegstart == true // 0: false, 1: true
            )
        );

        return waypoint;
    }
}
