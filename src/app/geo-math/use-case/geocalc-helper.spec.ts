import {GeocalcHelper} from './geocalc-helper';
import {Position2d} from '../domain/geometry/position2d';
import {LengthUnit} from '../domain/quantities/units';


describe('GeocalcHelper', () => {
    beforeEach(() => {
    });


    // region calcDistance

    it('calculates the correct distance between 2 positions', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(7.1, 47.1);
        const dist = GeocalcHelper.calcDistance(pos1, pos2);

        expect(dist.getValue(LengthUnit.M)).toBeCloseTo(13455.27849608188, 0);
    });

    // endregion


    // region calcBearing

    it('calculates the correct bearing between 2 positions', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(7.1, 47.1);
        const bearing = GeocalcHelper.calcBearing(pos1, pos2);

        expect(bearing.deg).toBeCloseTo(34.23, 1);
    });

    // endregion
});
