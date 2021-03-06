import {IRestPolygon} from './i-rest-polygon';
import {PolygonConverter} from './polygon-converter';
import {Position2d} from '../domain-model/geometry/position2d';


describe('PolygonConverter', () => {
    beforeEach(() => {
    });


    it('creates an instance from json', () => {
        const restPoly: IRestPolygon = JSON.parse('[[7.0, 47.0], [7.9, 47.9], [7.9, 47.0], [7.0, 47.0]]');

        const poly = PolygonConverter.fromRest(restPoly);

        expect(poly).toBeDefined();
        expect(poly.positions[0]).toEqual(Position2d.createFromArray([7.0, 47.0]));
        expect(poly.positions[1]).toEqual(Position2d.createFromArray([7.9, 47.9]));
        expect(poly.positions[2]).toEqual(Position2d.createFromArray([7.9, 47.0]));
        expect(poly.positions[3]).toEqual(Position2d.createFromArray([7.0, 47.0]));
    });
});
