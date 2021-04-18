import {inject, TestBed} from '@angular/core/testing';
import {OlBaseMapService} from './ol-base-map.service';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


describe('OlMapService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OlBaseMapService]
        });
    });


    it('should be created', inject([OlBaseMapService], (service: OlBaseMapService) => {
        expect(service).toBeTruthy();
    }));


    it('converts lon/lat to mercator coordinates', () => {
        const lonLat = new Position2d(7.0, 47.0);
        const mercator = OlBaseMapService.getMercator(lonLat);
        expect(mercator).toBeDefined();
        expect(mercator[0]).toBeCloseTo(779236.44, 1);
        expect(mercator[1]).toBeCloseTo(5942074.07, 1);
    });


    it('converts mercator to lon/lat', () => {
        const mercator: [number, number] = [779236.44, 5942074.07];
        const lonLat = OlBaseMapService.getPosFromMercator(mercator);
        expect(lonLat).toBeDefined();
        expect(lonLat.longitude).toBeCloseTo(7.0, 1);
        expect(lonLat.latitude).toBeCloseTo(47.0, 1);
    });
});
