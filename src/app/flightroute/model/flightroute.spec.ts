import {Flightroute} from './flightroute';
import {Aircraft} from './aircraft';
import {Speed} from '../../shared/model/quantities/speed';
import {ConsumptionUnit, SpeedUnit, TimeUnit} from '../../shared/model/units';
import {Consumption} from '../../shared/model/quantities/consumption';
import {WaypointType} from './waypoint-type';
import {Waypoint} from './waypoint';
import {Position2d} from '../../shared/model/geometry/position2d';
import {Time} from '../../shared/model/quantities/time';


describe('Flightroute', () => {
    let ac1: Aircraft;
    let wp1, wp2, wp3, wp4, alt: Waypoint;
    let route1: Flightroute;
    beforeEach(() => {
        ac1 = new Aircraft(new Speed(100, SpeedUnit.KT), new Consumption(20, ConsumptionUnit.L_PER_H));
        wp1 = new Waypoint(WaypointType.airport, '', '', '', '', '', new Position2d(7, 47), undefined);
        wp2 = new Waypoint(WaypointType.report, '', '', '', '', '', new Position2d(7.5, 47.5), undefined);
        wp3 = new Waypoint(WaypointType.airport, '', '', '', '', '', new Position2d(8, 48), undefined);
        wp4 = new Waypoint(WaypointType.navaid, '', '', '', '', '', new Position2d(8.2, 48.2), undefined);
        alt = new Waypoint(WaypointType.airport, '', '', '', '', '', new Position2d(8.6, 48.6), undefined);
        route1 = new Flightroute(1, '', '', ac1, [wp1, wp2, wp3], alt, new Time(30, TimeUnit.M));

    });


    it('creates an instance', () => {
        expect(route1).toBeDefined();
    });


    it('getWaypointIndex correctly detects the waypoints index', () => {
        expect(route1.getWaypointIndex(wp1)).toBe(0);
        expect(route1.getWaypointIndex(wp2)).toBe(1);
        expect(route1.getWaypointIndex(wp3)).toBe(2);
        expect(route1.getWaypointIndex(wp4)).toBe(-1);
        expect(route1.getWaypointIndex(alt)).toBe(-1);
    });


    it('containsWaypoint correctly detects if waypoints is in route', () => {
        expect(route1.containsWaypoint(wp1)).toBe(true);
        expect(route1.containsWaypoint(wp2)).toBe(true);
        expect(route1.containsWaypoint(wp3)).toBe(true);
    });


    it('containsWaypoint correctly detects if waypoints is NOT in route', () => {
        expect(route1.containsWaypoint(wp4)).toBe(false);
        expect(route1.containsWaypoint(alt)).toBe(false);
    });


    it('isOriginAirport correctly detects if waypoints is origin airport', () => {
        expect(route1.isOriginAirport(wp1)).toBe(true);
    });


    it('isOriginAirport correctly detects if waypoints is NOT origin airport', () => {
        expect(route1.isOriginAirport(wp2)).toBe(false);
        expect(route1.isOriginAirport(wp3)).toBe(false);
        expect(route1.isOriginAirport(wp4)).toBe(false);
        expect(route1.isOriginAirport(alt)).toBe(false);
    });


    it('isDestinationAirport correctly detects if waypoints is destination airport', () => {
        expect(route1.isDestinationAirport(wp3)).toBe(true);
    });


    it('isDestinationAirport correctly detects if waypoints is NOT destination airport', () => {
        expect(route1.isDestinationAirport(wp1)).toBe(false);
        expect(route1.isDestinationAirport(wp2)).toBe(false);
        expect(route1.isDestinationAirport(wp4)).toBe(false);
        expect(route1.isDestinationAirport(alt)).toBe(false);
    });


    it('isAlternateWaypoint correctly detects if waypoints is destination airport', () => {
        expect(route1.isAlternateWaypoint(alt)).toBe(true);
    });


    it('isAlternateWaypoint correctly detects if waypoints is NOT destination airport', () => {
        expect(route1.isAlternateWaypoint(wp1)).toBe(false);
        expect(route1.isAlternateWaypoint(wp2)).toBe(false);
        expect(route1.isAlternateWaypoint(wp3)).toBe(false);
        expect(route1.isAlternateWaypoint(wp4)).toBe(false);
    });


    it('isAlternateEligible correctly detects when wp can be used as alternate', () => {
        expect(route1.isALternateEligible(wp1)).toBe(true);
        expect(route1.isALternateEligible(alt)).toBe(true);
    });


    it('isAlternateEligible correctly detects when wp can NOT be used as alternate', () => {
        expect(route1.isALternateEligible(undefined)).toBe(false);
        expect(route1.isALternateEligible(wp2)).toBe(false); // wp2 = not an airport
        expect(route1.isALternateEligible(wp3)).toBe(false); // wp3 = already used as destination
        expect(route1.isALternateEligible(wp4)).toBe(false); // wp4 = not an airport
    });
});
