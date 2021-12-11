import {Position2d} from '../../domain-model/geometry/position2d';
import {IWmmService} from './i-wmm.service';
import {WmmService} from './wmm.service';


describe('WmmService', () => {
    let wmmService: IWmmService;


    beforeEach(() => {
        wmmService = new WmmService();
    });


    it('calculates the correct mag var for a position in CH', () => {
        const pos = new Position2d(7.0, 47.0);
        const magVar = wmmService.calcMagneticVariation(pos);

        expect(magVar.deg).toBeCloseTo(2, 0);
    });


    it('calculates the correct mag var for a position in greenland', () => {
        const pos = new Position2d(-51.7500000, 64.1833333);
        const magVar = wmmService.calcMagneticVariation(pos);

        expect(magVar.deg).toBeCloseTo(-26.62, 0);
    });
});
