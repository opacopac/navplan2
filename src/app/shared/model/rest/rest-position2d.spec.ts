import {IRestPosition2d} from './i-rest-position2d';
import {RestPosition2d} from './rest-position2d';


describe('RestPosition2d', () => {
    beforeEach(() => {
    });


    it('creates an instance from json', () => {
        const restPos2d: IRestPosition2d = JSON.parse('[7.0, 47.0]');

        const pos2d = RestPosition2d.fromRest(restPos2d);

        expect(pos2d).toBeDefined();
        expect(pos2d.longitude).toEqual(7.0);
        expect(pos2d.latitude).toEqual(47.0);
    });


    it('throws an error for an invalid format', () => {
        const restPos2d: IRestPosition2d = JSON.parse('["abc", "xyz"]');

        try {
            RestPosition2d.fromRest(restPos2d);
            fail();
        } catch {
        }
    });
});
