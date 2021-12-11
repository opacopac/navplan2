import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {OlGeometry} from './ol-geometry';


describe('OlGeometry', () => {
    beforeEach(() => {
    });


    it('converts lon/lat to mercator coordinates', () => {
        const lonLat = new Position2d(7.0, 47.0);
        const mercator = OlGeometry.getMercator(lonLat);
        expect(mercator).toBeDefined();
        expect(mercator[0]).toBeCloseTo(779236.44, 1);
        expect(mercator[1]).toBeCloseTo(5942074.07, 1);
    });


    it('converts mercator to lon/lat', () => {
        const mercator: [number, number] = [779236.44, 5942074.07];
        const lonLat = OlGeometry.getPosFromMercator(mercator);
        expect(lonLat).toBeDefined();
        expect(lonLat.longitude).toBeCloseTo(7.0, 1);
        expect(lonLat.latitude).toBeCloseTo(47.0, 1);
    });


    it('gets the correct mercator pos array', () => {
        const extent = OlGeometry.getExtentFromMercator([1, 2, 3, 4]);
        const extOut = OlGeometry.getExtentAsMercator(extent);
        expect(extOut[0]).toBeCloseTo(1, 8);
        expect(extOut[1]).toBeCloseTo(2, 8);
        expect(extOut[2]).toBeCloseTo(3, 8);
        expect(extOut[3]).toBeCloseTo(4, 8);
    });
});
