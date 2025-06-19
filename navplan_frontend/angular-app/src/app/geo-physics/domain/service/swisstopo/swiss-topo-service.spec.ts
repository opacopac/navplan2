import {SwissTopoService} from './swiss-topo-service';
import {GeoCoordinateType} from '../../../../aerodrome-charts/domain/model/geo-coordinate-type';
import {GeoCoordinate} from '../../model/geometry/geo-coordinate';


describe('SwissTopoService', () => {
    beforeEach(() => {
    });


    it('calculates the LV03 coordinates based on a WGS84 coordinate', () => {
        // given
        const wgs84Pos = GeoCoordinate.ofWgs84(7.0, 47.0);

        // when
        const result = SwissTopoService.wgs84ToLv03(wgs84Pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LV03);
        expect(result.getE()).toBeCloseTo(566639.448, 0);
        expect(result.getN()).toBeCloseTo(205531.529, 0);
    });


    it('calculates the WGS84 coordinates based on a LV03 coordinate', () => {
        // given
        const pos = GeoCoordinate.ofLv03(600000, 200000);

        // when
        const result = SwissTopoService.lv03ToWgs84(pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LON_LAT);
        expect(result.getE()).toBeCloseTo(7.438632421, 5);
        expect(result.getN()).toBeCloseTo(46.951082773, 5);
    });


    it('calculates the WGS84 coordinates based on a LV95 coordinate', () => {
        // given
        const lv95pos = GeoCoordinate.ofLv95(2600000, 1200000);

        // when
        const result = SwissTopoService.lv95ToWgs84(lv95pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LON_LAT);
        expect(result.getE()).toBeCloseTo(7.438632421, 5);
        expect(result.getN()).toBeCloseTo(46.951082773, 5);
    });


    it('calculates the LV95 coordinates based on a WGS84 coordinate', () => {
        // given
        const wgs84Pos = GeoCoordinate.ofWgs84(7.0, 47.0);

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
        const lv03Pos = GeoCoordinate.ofLv03(600000, 200000);

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
        const lv95Pos = GeoCoordinate.ofLv95(2600000, 1200000);

        // when
        const result = SwissTopoService.lv95ToLv03(lv95Pos);

        // then
        expect(result).toBeDefined();
        expect(result.getType()).toBe(GeoCoordinateType.LV03);
        expect(result.getE()).toBe(600000);
        expect(result.getN()).toBe(200000);
    });
});
