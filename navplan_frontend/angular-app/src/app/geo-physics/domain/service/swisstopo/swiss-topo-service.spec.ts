import {Position2d} from '../../model/geometry/position2d';
import {SwissTopoService} from './swiss-topo-service';
import {GeoCoordinateType} from '../../../../aerodrome-charts/domain/model/geo-coordinate-type';
import {GenericGeoCoordinate} from '../../model/geometry/generic-geo-coordinate';


describe('SwissTopoService', () => {
    beforeEach(() => {
    });


    it('calculates the LV03 coordinates based on a WGS84 coordinate', () => {
        // given
        const pos = new Position2d(7.0, 47.0);

        // when
        const lv03Pos = SwissTopoService.toCh03(pos);

        // then
        expect(lv03Pos).toBeDefined();
        expect(lv03Pos.getType()).toBe(GeoCoordinateType.LV03);
        expect(lv03Pos.getE()).toBeCloseTo(566639.448, 0);
        expect(lv03Pos.getN()).toBeCloseTo(205531.529, 0);
    });


    it('calculates the WGS84 coordinates based on a LV03 coordinate', () => {
        // given
        const pos = new GenericGeoCoordinate(GeoCoordinateType.LV03, 600000, 200000);

        // when
        const wgs84Pos = SwissTopoService.toWgs84(pos);

        // then
        expect(wgs84Pos).toBeDefined();
        expect(wgs84Pos.getType()).toBe(GeoCoordinateType.LON_LAT);
        expect(wgs84Pos.longitude).toBeCloseTo(7.438632421, 5);
        expect(wgs84Pos.latitude).toBeCloseTo(46.951082773, 5);
    });
});
