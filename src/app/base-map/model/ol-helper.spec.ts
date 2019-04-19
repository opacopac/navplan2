import {Position2d} from '../../shared/model/geometry/position2d';
import {OlHelper} from './ol-helper';

describe('OlHelper', () => {
    beforeEach(() => {
    });


    it('converts lon/lat to mercator coordinates', () => {
        const lonLat = new Position2d(7.0, 47.0);
        const mercator = OlHelper.getMercator(lonLat);
        expect(mercator).toBeDefined();
        expect(mercator[0]).toBeCloseTo(779236.44, 1);
        expect(mercator[1]).toBeCloseTo(5942074.07, 1);
    });


    it('converts mercator to lon/lat', () => {
        const mercator: [number, number] = [779236.44, 5942074.07];
        const lonLat = OlHelper.getPosFromMercator(mercator);
        expect(lonLat).toBeDefined();
        expect(lonLat.longitude).toBeCloseTo(7.0, 1);
        expect(lonLat.latitude).toBeCloseTo(47.0, 1);
    });
});
