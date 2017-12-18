import { Injectable } from '@angular/core';
import { Waypoint, Waypointtype } from '../model/waypoint';
import { StringnumberService } from './stringnumber.service';
import { GeocalcService } from './geocalc.service';


const ADDITIONAL_VAC_TIME_MIN = 5;
const VAC_STRING = 'VAC';


@Injectable()
export class WaypointService {
    constructor() { }


    public static recalcWaypoints(wps: Waypoint[], altWp: Waypoint, magvar: number, speed: number) {
        let prevWp;

        // waypoints
        for (let i = 0; i < wps.length; i++) {
            // vac time for start/end +5
            if ((i === 1 && wps[0].type === Waypointtype.airport) || (i === wps.length - 1 && wps[i].type === Waypointtype.airport)) {
                wps[i].vacTime = ADDITIONAL_VAC_TIME_MIN;
            } else {
                wps[i].vacTime = 0;
            }


            // recalc distance & bearing
            if (i > 0) {
                prevWp = wps[i - 1];
            } else {
                prevWp = undefined;
            }

            WaypointService.recalcWp(wps[i], prevWp, false, magvar, speed);
        }

        // alternate
        if (altWp) {
            // vac time +5
            altWp.vacTime = ADDITIONAL_VAC_TIME_MIN;

            if (wps.length > 0) {
                prevWp = wps[wps.length - 1];
            } else {
                prevWp = undefined;
            }

            WaypointService.recalcWp(altWp, prevWp, true, magvar, speed);
        }
    }


    private static recalcWp(wp: Waypoint, prevWp: Waypoint, isAlternate: boolean, magvar: number, speed: number) {
        // distance & bearing
        if (prevWp) {
            wp.dist = Math.ceil(GeocalcService.getDistance(wp.latitude, wp.longitude, prevWp.latitude, prevWp.longitude));
            wp.mt = Math.round(GeocalcService.getBearing(prevWp.latitude, prevWp.longitude, wp.latitude, wp.longitude, magvar));
        } else {
            wp.dist = undefined;
            wp.mt = undefined;
        }

        // format mt / dist / eet
        wp.mtText = WaypointService.getMtText(wp, isAlternate);
        wp.distText = WaypointService.getDistText(wp);
        wp.eetText = WaypointService.getEetText(wp, speed);
    }


    private static getMtText(wp: Waypoint, isAlternate: boolean): string {
        if (!wp || !wp.mt) {
            return '';
        } else if (wp.vacTime > 0 && !isAlternate) {
            return VAC_STRING;
        } else {
            return StringnumberService.zeroPad(wp.mt, 3);
        }
    }


    private static getDistText(wp): string {
        if (!wp || !wp.dist) {
            return '';
        } else {
            return '' + Math.ceil(wp.dist);
        }
    }


    private static getEetText(wp, speed): string {
        if (!wp || !wp.dist || wp.dist <= 0 || !speed || speed <= 0) {
            return '';
        }

        const eet = '' + Math.ceil(wp.dist / speed * 60);

        if (wp.vacTime > 0) {
            return eet + '/+' + wp.vacTime;
        } else {
            return eet;
        }
    }
}
