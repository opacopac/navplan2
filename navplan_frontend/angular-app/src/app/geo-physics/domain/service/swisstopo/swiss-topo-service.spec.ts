import {Position2d} from '../../model/geometry/position2d';
import {SwissTopoService} from './swiss-topo-service';
import {GeoCoordinateType} from '../../../../aerodrome-charts/domain/model/geo-coordinate-type';
import {GenericGeoCoordinate} from '../../model/geometry/generic-geo-coordinate';


describe('SwissTopoService', () => {
    beforeEach(() => {
    });


    it('calculates the LV03 coordinates based on a WGS84 coordinate', () => {
        // given
        const wgs84Pos = new Position2d(7.0, 47.0);

        // when
        const result = SwissTopoService.wsg84ToLv03(wgs84Pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LV03);
        expect(result.getE()).toBeCloseTo(566639.448, 0);
        expect(result.getN()).toBeCloseTo(205531.529, 0);
    });


    it('calculates the WGS84 coordinates based on a LV03 coordinate', () => {
        // given
        const pos = new GenericGeoCoordinate(GeoCoordinateType.LV03, 600000, 200000);

        // when
        const result = SwissTopoService.lv03ToWgs84(pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LON_LAT);
        expect(result.longitude).toBeCloseTo(7.438632421, 5);
        expect(result.latitude).toBeCloseTo(46.951082773, 5);
    });


    it('calculates the WGS84 coordinates based on a LV95 coordinate', () => {
        // given
        const lv95pos = new GenericGeoCoordinate(GeoCoordinateType.LV95, 2600000, 1200000);

        // when
        const result = SwissTopoService.lv95ToWgs84(lv95pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LON_LAT);
        expect(result.longitude).toBeCloseTo(7.438632421, 5);
        expect(result.latitude).toBeCloseTo(46.951082773, 5);
    });


    it('calculates the LV95 coordinates based on a WGS84 coordinate', () => {
        // given
        const wgs84Pos = new Position2d(7.0, 47.0);

        // when
        const result = SwissTopoService.Wgs84ToLv95(wgs84Pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LV95);
        expect(result.getE()).toBeCloseTo(2566639.343, 0);
        expect(result.getN()).toBeCloseTo(1205531.915, 0);
    });


    it('converts LV03 to LV95 coordinates', () => {
        // given
        const lv03Pos = new GenericGeoCoordinate(GeoCoordinateType.LV03, 600000, 200000);

        // when
        const result = SwissTopoService.lv03ToLv95(lv03Pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LV95);
        expect(result.getE()).toBe(2600000);
        expect(result.getN()).toBe(1200000);
    });


    it('converts LV95 to LV03 coordinates', () => {
        // given
        const lv95Pos = new GenericGeoCoordinate(GeoCoordinateType.LV95, 2600000, 1200000);

        // when
        const result = SwissTopoService.lv95ToLv03(lv95Pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LV03);
        expect(result.getE()).toBe(600000);
        expect(result.getN()).toBe(200000);
    });
});
