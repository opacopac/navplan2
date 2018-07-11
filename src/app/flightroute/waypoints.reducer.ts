import {Flightroute} from './model/flightroute';
import {Speed} from '../shared/model/quantities/speed';
import {Waypoint} from './model/waypoint';
import {GeocalcService} from '../shared/services/geocalc/geocalc.service';
import {StringnumberService} from '../shared/services/stringnumber/stringnumber.service';
import {LengthUnit, SpeedUnit} from '../shared/model/units';
import {WaypointType} from './model/waypoint-type';


export class WaypointsReducer {
    public static calcWaypointList(flightroute: Flightroute): Waypoint[] {
        let prevWp;
        const newWpList: Waypoint[] = [];

        // waypoints
        const wps = flightroute.waypoints;
        for (let i = 0; i < wps.length; i++) {
            // vac time for start/end +5
            if ((i === 1 && wps[0].type === WaypointType.airport) || (i === wps.length - 1 && wps[i].type === WaypointType.airport)) {
                wps[i].vacTime = 5;
            } else {
                wps[i].vacTime = 0;
            }

            // recalc distance & bearing
            if (i > 0) {
                prevWp = wps[i - 1];
            } else {
                prevWp = undefined;
            }

            newWpList.push(this.calcWaypoint(wps[i], prevWp, false, flightroute.aircraft.speed));
        }

        return newWpList;
    }


    public static calcAlternate(flightroute: Flightroute): Waypoint {
        if (!flightroute.alternate) {
            return undefined;
        }

        const wps = flightroute.waypoints;
        const prevWp = wps.length > 0 ? wps[wps.length - 1] : undefined;
        const altWp = flightroute.alternate.clone();
        altWp.vacTime = 5;

        this.calcWaypoint(altWp, prevWp, true, flightroute.aircraft.speed);
    }


    private static calcWaypoint(wp: Waypoint, prevWp: Waypoint, isAlternate: boolean, speed: Speed): Waypoint {
        const newWp = wp.clone();
        // calc distance & bearing
        if (prevWp) {
            newWp.dist = GeocalcService.getDistance(wp.position, prevWp.position);
            newWp.mt = GeocalcService.getBearing(prevWp.position, wp.position, wp.variation);
        } else {
            newWp.dist = undefined;
            newWp.mt = undefined;
        }

        // format mt / dist / eet
        newWp.mtText = this.calcMtText(wp, isAlternate);
        newWp.distText = this.calcDistText(wp);
        newWp.eetText = this.caltEetText(wp, speed);

        return newWp;
    }


    private static calcMtText(wp: Waypoint, isAlternate: boolean): string {
        if (!wp || !wp.mt) {
            return '';
        } else if (wp.vacTime > 0 && !isAlternate) {
            return 'VAC';
        }

        const mt_num = Number(wp.mt.deg);
        if (isNaN(mt_num)) {
            return '';
        } else {
            return StringnumberService.zeroPad(Math.round(mt_num), 3);
        }
    }


    private static calcDistText(wp: Waypoint): string {
        if (!wp || !wp.dist) {
            return '';
        }

        const dist_num = Number(wp.dist.getValue(LengthUnit.NM)); // TODO
        if (isNaN(dist_num)) {
            return '';
        } else {
            return Math.ceil(dist_num).toString();
        }
    }


    private static caltEetText(wp: Waypoint, speed: Speed): string {
        if (!wp || !wp.dist || wp.dist.nm <= 0 || !speed || speed.getValue(SpeedUnit.KT) <= 0) { // TODO
            return '';
        }

        const dist_num = Number(wp.dist);
        if (isNaN(dist_num)) {
            return '';
        }

        const eet = Math.ceil(dist_num / speed.getValue(SpeedUnit.KT) * 60);

        if (wp.vacTime > 0) {
            return eet + '/+' + wp.vacTime;
        } else {
            return eet.toString();
        }
    }
}