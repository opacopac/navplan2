import {GeocalcService} from './geocalc.service';
import {Position2d} from '../../model/geometry/position2d';
import {LengthUnit} from '../../model/units';


describe('GeocalcService', () => {
    beforeEach(() => {
    });


    // region getDistance

    it('calculates the correct distance between 2 positions', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(7.1, 47.1);
        const dist = GeocalcService.getDistance(pos1, pos2);

        expect(dist.getValue(LengthUnit.M)).toBeCloseTo(13470.352, 0);
    });

    // endregion


    // region getBearing

    it('calculates the correct bearing between 2 positions', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(7.1, 47.1);
        const bearing = GeocalcService.getBearing(pos1, pos2);

        expect(bearing.deg).toBeCloseTo(34.23, 1);
    });

    // endregion


    // region calcCircleApproxBearing

    it('calculates a 0 bearing based on 0 positions', () => {
        const bearing = GeocalcService.calcCircleApproxBearing([]);
        expect(bearing.deg).toBe(0);
    });


    it('calculates a 0 bearing based on 1 position', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const bearing = GeocalcService.calcCircleApproxBearing([pos1]);
        expect(bearing.deg).toBe(0);
    });


    it('calculates a direct bearing based on 2 position', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(7.1, 47.1);
        const bearing = GeocalcService.calcCircleApproxBearing([pos1, pos2]);
        const bearing2 = GeocalcService.getBearing(pos1, pos2);

        expect(bearing.deg).toBe(bearing2.deg);
    });


    it('calculates a circle bearing based on 3 position near erlach', () => {
        const pos1 = new Position2d(7.071426, 47.027690);
        const pos2 = new Position2d(7.074894, 47.039889);
        const pos3 = new Position2d(7.085692, 47.050945);
        const bearing = GeocalcService.calcCircleApproxBearing([pos1, pos2, pos3]);

        expect(bearing.deg).toBeCloseTo(43, -1);
    });


    it('calculates a bearing based on 3 position near the equator', () => {
        const pos1 = new Position2d(9.762744, 0.429249);
        const pos2 = new Position2d(9.778973, 0.669567);
        const pos3 = new Position2d(9.893958, 0.863830);
        const bearing = GeocalcService.calcCircleApproxBearing([pos1, pos2, pos3]);

        expect(bearing.deg).toBeCloseTo(43, -1);
    });


    it('calculates a bearing based on 5 position of a taxi track in lszb', () => {
        const pos1 = new Position2d(7.498810, 46.912790);
        const pos2 = new Position2d(7.498916, 46.912707);
        const pos3 = new Position2d(7.499273, 46.912487);
        const pos4 = new Position2d(7.499678, 46.912586);
        const pos5 = new Position2d(7.499892, 46.912707);
        const bearing = GeocalcService.calcCircleApproxBearing([pos1, pos2, pos3, pos4, pos5]);

        expect(bearing.deg).toBeCloseTo(30, -1);
    });


    it('calculates a bearing based on 4 position of a straight track in lsge', () => {
        const pos1 = new Position2d(6.126777, 46.250043);
        const pos2 = new Position2d(6.110511, 46.238964);
        const pos3 = new Position2d(6.091362, 46.226048);
        const pos4 = new Position2d(6.098154, 46.230688);
        const bearing = GeocalcService.calcCircleApproxBearing([pos1, pos2, pos3, pos4]);

        expect(bearing.deg).toBeCloseTo(226, -1);
    });


    // endregion
});
