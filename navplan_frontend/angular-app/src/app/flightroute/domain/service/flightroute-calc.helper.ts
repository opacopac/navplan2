import {Flightroute} from '../model/flightroute';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Waypoint} from '../model/waypoint';
import {GeodesyHelper} from '../../../geo-physics/domain/service/geometry/geodesy-helper';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';
import {TimeUnit} from '../../../geo-physics/domain/model/quantities/time-unit';
import {WaypointType} from '../model/waypoint-type';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {RouteFuel} from '../model/routefuel';
import {Volume} from '../../../geo-physics/domain/model/quantities/volume';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {SpeedUnit} from '../../../geo-physics/domain/model/quantities/speed-unit';
import {VolumeUnit} from '../../../geo-physics/domain/model/quantities/volume-unit';
import {ConsumptionUnit} from '../../../geo-physics/domain/model/quantities/consumption-unit';


export class FlightrouteCalcHelper {
    public static calcFlightRoute(flightroute: Flightroute, lengthUnit: LengthUnit = LengthUnit.NM): Flightroute {
        if (!flightroute) {
            return null;
        }

        this.calcWaypointList(flightroute, lengthUnit);
        this.calcAlternate(flightroute, lengthUnit);
        this.calcTripDist(flightroute, lengthUnit);
        this.calcTimesAndFuel(flightroute);

        return flightroute;
    }


    // region waypoints

    private static calcWaypointList(flightroute: Flightroute, lengthUnit: LengthUnit) {
        let prevWp;

        // waypoints
        const wps = flightroute.waypoints;
        for (let i = 0; i < wps.length; i++) {
            // vac time for start/end airport +5
            if ((i === 1 && wps[0].type === WaypointType.airport) || (i === wps.length - 1 && wps[i].type === WaypointType.airport)) {
                // wps[i].vacTime = new Time(5, TimeUnit.M);
            } else {
                // wps[i].vacTime = new Time(0, TimeUnit.M);
            }

            // recalc distance & bearing
            if (i > 0) {
                prevWp = wps[i - 1];
            } else {
                prevWp = undefined;
            }
            this.calcWaypoint(wps[i], prevWp, flightroute.aircraftParams.speed, lengthUnit);
        }
    }


    private static calcAlternate(flightroute: Flightroute, lengthUnit: LengthUnit) {
        if (!flightroute.alternate) { return; }

        const wps = flightroute.waypoints;
        const prevWp = wps.length > 0 ? wps[wps.length - 1] : undefined;
        flightroute.alternate.vacTime = new Time(5, TimeUnit.M);
        flightroute.alternate.eet = this.calcEet(flightroute.alternate, flightroute.aircraftParams.speed);

        this.calcWaypoint(flightroute.alternate, prevWp, flightroute.aircraftParams.speed, lengthUnit);
    }


    private static calcWaypoint(wp: Waypoint, prevWp: Waypoint, speed: Speed, lengthUnit: LengthUnit) {
        if (!wp) { return; }

        // calc distance & bearing
        if (prevWp) {
            wp.dist = GeodesyHelper.calcDistance(wp.position, prevWp.position);
            wp.mt = GeodesyHelper.calcBearing(prevWp.position, wp.position, wp.variation);
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
        if (!wp || !wp.dist || wp.dist.isZeroOrNegative() || !speed || speed.isZeroOrNegative()) {
            return new Time(0, TimeUnit.M);
        }

        const eet_min = wp.dist.getValue(LengthUnit.NM) / speed.getValue(SpeedUnit.KT) * 60;
        const eet = new Time(eet_min, TimeUnit.M);


        if (!wp.vacTime.isZeroOrNegative()) {
            return eet.add(wp.vacTime);
        } else {
            return eet;
        }
    }


    private static calcMtText(wp: Waypoint): string {
        if (!wp || !wp.mt || isNaN(wp.mt.deg)) {
            return '';
        } else if (!wp.vacTime.isZeroOrNegative()) {
            return 'VAC';
        }

        return StringnumberHelper.zeroPad(Math.round(wp.mt.deg), 3);
    }


    private static calcDistText(wp: Waypoint, lengthUnit: LengthUnit): string {
        if (!wp || !wp.dist || isNaN(wp.dist.getValue(lengthUnit))) {
            return '';
        }

        return Math.ceil(wp.dist.getValue(lengthUnit)).toString();
    }


    private static calcEetText(wp: Waypoint): string {
        if (!wp || !wp.eet || wp.eet.isZeroOrNegative()) {
            return '';
        }

        const eet_min = Math.ceil(wp.eet.getValue(TimeUnit.M));

        if (!wp.vacTime.isZeroOrNegative()) {
            return eet_min + '/+' + Math.ceil(wp.vacTime.getValue(TimeUnit.M));
        } else {
            return eet_min.toString();
        }
    }


    private static calcTripDist(flightroute: Flightroute, lenghtUnit: LengthUnit): Length {
        return flightroute.waypoints.reduce((tripDist, wp) => wp.dist ? tripDist.add(wp.dist) : tripDist, new Length(0, lenghtUnit));
    }

    // endregion


    // region times & fuel

    private static calcTimesAndFuel(flightroute: Flightroute) {
        // time
        flightroute.fuel.tripTime = this.calcTripTime(flightroute.waypoints);
        flightroute.fuel.alternateTime = flightroute.alternate ? flightroute.alternate.eet : new Time(0, TimeUnit.M);
        flightroute.fuel.minimumTime = this.calcMinimumTime(flightroute.fuel);
        flightroute.fuel.extraTime = flightroute.extraTime ? flightroute.extraTime : new Time(0, TimeUnit.M);
        flightroute.fuel.blockTime = this.calcBlockTime(flightroute.fuel);

        // fuel
        flightroute.fuel.tripFuel = this.calcFuel(flightroute.fuel.tripTime, flightroute.aircraftParams.consumption);
        flightroute.fuel.alternateFuel = this.calcFuel(flightroute.fuel.alternateTime, flightroute.aircraftParams.consumption);
        flightroute.fuel.reserveFuel = this.calcFuel(flightroute.fuel.reserveTime, flightroute.aircraftParams.consumption);
        flightroute.fuel.minimumFuel = this.calcFuel(flightroute.fuel.minimumTime, flightroute.aircraftParams.consumption);
        flightroute.fuel.extraFuel = this.calcFuel(flightroute.fuel.extraTime, flightroute.aircraftParams.consumption);
        flightroute.fuel.blockFuel = this.calcFuel(flightroute.fuel.blockTime, flightroute.aircraftParams.consumption);
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


    private static calcFuel(time: Time, consumption: Consumption): Volume {
        const fuel_l = Math.ceil(time.min / 60 * consumption.getValue(ConsumptionUnit.L_PER_H));
        return new Volume(fuel_l, VolumeUnit.L);
    }

    // endregion
}
