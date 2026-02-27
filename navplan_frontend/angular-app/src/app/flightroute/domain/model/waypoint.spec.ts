import {WaypointType} from './waypoint-type';
import {Waypoint} from './waypoint';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {WaypointAltitude} from './waypoint-altitude';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeUnit} from '../../../geo-physics/domain/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../geo-physics/domain/model/geometry/altitude-reference';


describe('Waypoint', () => {
    let wp1: Waypoint;
    let alt1 = new Altitude(4500, AltitudeUnit.FT, AltitudeReference.MSL);
    beforeEach(() => {
        wp1 = new Waypoint(WaypointType.airport, '', '', '', '', '', new Position2d(7, 47), undefined);
        alt1 = new Altitude(4500, AltitudeUnit.FT, AltitudeReference.MSL);
    });


    it('creates an instance', () => {
        expect(wp1).toBeDefined();
    });


    it('gets the correct min/max altitudes for a min altitude waypoint', () => {
        // given
        wp1.wpAlt = new WaypointAltitude(alt1, true, false);

        // when
        const minAltWp1 = wp1.getMinAlt();
        const maxAltWp1 = wp1.getMaxAlt();

        // then
        expect(minAltWp1).toEqual(alt1);
        expect(maxAltWp1).toBeUndefined();
    });


    it('gets the correct min/max altitudes for a max altitude waypoint', () => {
        // given
        wp1.wpAlt = new WaypointAltitude(alt1, false, true);

        // when
        const minAltWp1 = wp1.getMinAlt();
        const maxAltWp1 = wp1.getMaxAlt();

        // then
        expect(minAltWp1).toBeUndefined();
        expect(maxAltWp1).toBe(alt1);
    });


    it('gets the correct min/max altitudes for a min/max altitude waypoint', () => {
        // given
        wp1.wpAlt = new WaypointAltitude(alt1, true, true);

        // when
        const minAltWp1 = wp1.getMinAlt();
        const maxAltWp1 = wp1.getMaxAlt();

        // then
        expect(minAltWp1).toEqual(alt1);
        expect(maxAltWp1).toEqual(alt1);
    });


    it('gets the correct min/max altitudes for an exact altitude waypoint', () => {
        // given
        wp1.wpAlt = new WaypointAltitude(alt1, false, false);

        // when
        const minAltWp1 = wp1.getMinAlt();
        const maxAltWp1 = wp1.getMaxAlt();

        // then
        expect(minAltWp1).toEqual(alt1);
        expect(maxAltWp1).toEqual(alt1);
    });


    it('gets the correct min/max altitudes for a waypoint without altitude', () => {
        // given
        wp1.wpAlt = undefined;

        // when
        const minAltWp1 = wp1.getMinAlt();
        const maxAltWp1 = wp1.getMaxAlt();

        // then
        expect(minAltWp1).toBeUndefined();
        expect(maxAltWp1).toBeUndefined();
    });
});
