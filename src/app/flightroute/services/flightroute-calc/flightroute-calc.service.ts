import {Flightroute} from '../../model/flightroute';
import {Speed} from '../../../shared/model/quantities/speed';
import {Waypoint} from '../../model/waypoint';
import {GeocalcService} from '../../../shared/services/geocalc/geocalc.service';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {ConsumptionUnit, LengthUnit, SpeedUnit, TimeUnit, VolumeUnit} from '../../../shared/model/units';
import {WaypointType} from '../../model/waypoint-type';
import {Time} from '../../../shared/model/quantities/time';
import {RouteFuel} from '../../model/routefuel';
import {Fuel} from '../../../shared/model/quantities/fuel';
import {Consumption} from '../../../shared/model/quantities/consumption';


export class FlightrouteCalcService {
    public static calcFlightRoute(flightroute: Flightroute, lengthUnit: LengthUnit = LengthUnit.NM) {
        if (!flightroute) { return; }

        this.calcWaypointList(flightroute, lengthUnit);
        this.calcAlternate(flightroute, lengthUnit);
        this.calcTimesAndFuel(flightroute);
    }


    // region waypoints

    private static calcWaypointList(flightroute: Flightroute, lengthUnit: LengthUnit) {
        let prevWp;

        // waypoints
        const wps = flightroute.waypoints;
        for (let i = 0; i < wps.length; i++) {
            // vac time for start/end +5
            if ((i === 1 && wps[0].type === WaypointType.airport) || (i === wps.length - 1 && wps[i].type === WaypointType.airport)) {
                wps[i].vacTime = new Time(5, TimeUnit.M);
            } else {
                wps[i].vacTime = new Time(0, TimeUnit.M);
            }

            // recalc distance & bearing
            if (i > 0) {
                prevWp = wps[i - 1];
            } else {
                prevWp = undefined;
            }
            this.calcWaypoint(wps[i], prevWp, flightroute.aircraft.speed, lengthUnit);
        }
    }


    private static calcAlternate(flightroute: Flightroute, lengthUnit: LengthUnit) {
        if (!flightroute.alternate) { return; }

        const wps = flightroute.waypoints;
        const prevWp = wps.length > 0 ? wps[wps.length - 1] : undefined;
        flightroute.alternate.vacTime = new Time(5, TimeUnit.M);
        flightroute.alternate.eet = this.calcEet(flightroute.alternate, flightroute.aircraft.speed);

        this.calcWaypoint(flightroute.alternate, prevWp, flightroute.aircraft.speed, lengthUnit);
    }


    private static calcWaypoint(wp: Waypoint, prevWp: Waypoint, speed: Speed, lengthUnit: LengthUnit) {
        if (!wp) { return; }

        // calc distance & bearing
        if (prevWp) {
            wp.dist = GeocalcService.getDistance(wp.position, prevWp.position);
            wp.mt = GeocalcService.getBearing(prevWp.position, wp.position, wp.variation);
        } else {
            wp.dist = undefined;
            wp.mt = undefined;
        }

        // calc eet
        wp.eet = this.calcEet(wp, speed);

        // get texts
        wp.mtText = this.calcMtText(wp);
        wp.distText = this.calcDistText(wp, lengthUnit);
        wp.eetText = this.calcEetText(wp);
    }


    private static calcEet(wp: Waypoint, speed: Speed): Time {
        if (!wp || !wp.dist || wp.dist.isZeroOrNegative || !speed || speed.isZeroOrNegative) {
            return new Time(0, TimeUnit.M);
        }

        const eet_min = wp.dist.getValue(LengthUnit.NM) / speed.getValue(SpeedUnit.KT) * 60;
        const eet = new Time(eet_min, TimeUnit.M);


        if (!wp.vacTime.isZeroOrNegative) {
            return eet.add(wp.vacTime);
        } else {
            return eet;
        }
    }


    private static calcMtText(wp: Waypoint): string {
        if (!wp || !wp.mt || isNaN(wp.mt.deg)) {
            return '';
        } else if (!wp.vacTime.isZeroOrNegative) {
            return 'VAC';
        }

        return StringnumberService.zeroPad(Math.round(wp.mt.deg), 3);
    }


    private static calcDistText(wp: Waypoint, lengthUnit: LengthUnit): string {
        if (!wp || !wp.dist || isNaN(wp.dist.getValue(lengthUnit))) {
            return '';
        }

        return Math.ceil(wp.dist.getValue(lengthUnit)).toString();
    }


    private static calcEetText(wp: Waypoint): string {
        if (!wp || !wp.eet || wp.eet.isZeroOrNegative) {
            return '';
        }

        const eet_min = Math.ceil(wp.eet.getValue(TimeUnit.M));

        if (!wp.vacTime.isZeroOrNegative) {
            return eet_min + '/+' + Math.ceil(wp.vacTime.getValue(TimeUnit.M));
        } else {
            return eet_min.toString();
        }
    }

    // endregion


    // region times & fuel

    private static calcTimesAndFuel(flightroute: Flightroute) {
        // time
        flightroute.fuel.tripTime = this.calcTripTime(flightroute.waypoints);
        flightroute.fuel.alternateTime = flightroute.alternate ? flightroute.alternate.eet : new Time(0, TimeUnit.M);
        flightroute.fuel.minimumTime = this.calcMinimumTime(flightroute.fuel);
        flightroute.fuel.blockTime = this.calcBlockTime(flightroute.fuel);

        // fuel
        flightroute.fuel.tripFuel = this.calcFuel(flightroute.fuel.tripTime, flightroute.aircraft.consumption);
        flightroute.fuel.alternateFuel = this.calcFuel(flightroute.fuel.alternateTime, flightroute.aircraft.consumption);
        flightroute.fuel.minimumFuel = this.calcFuel(flightroute.fuel.minimumTime, flightroute.aircraft.consumption);
        flightroute.fuel.blockFuel = this.calcFuel(flightroute.fuel.blockTime, flightroute.aircraft.consumption);
    }


    private static calcTripTime(waypoints: Waypoint[]): Time {
        return waypoints.reduce((tripTime, waypoint) => tripTime.add(waypoint.eet), new Time(0, TimeUnit.M));
    }


    private static calcMinimumTime(routeFuel: RouteFuel): Time {
        return routeFuel.tripTime
            .add(routeFuel.alternateTime)
            .add(routeFuel.reserveTime);
    }


    private static calcBlockTime(routeFuel: RouteFuel): Time {
        return routeFuel.minimumTime
            .add(routeFuel.extraTime);
    }


    private static calcFuel(time: Time, consumption: Consumption): Fuel {
        const fuel_l = time.min / 60 * consumption.getValue(ConsumptionUnit.L_PER_H);
        return new Fuel(fuel_l, VolumeUnit.L);
    }

    // endregion
}