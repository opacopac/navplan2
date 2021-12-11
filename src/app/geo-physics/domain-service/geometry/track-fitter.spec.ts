import {Position2d} from '../../domain-model/geometry/position2d';
import {TrackFitter} from './track-fitter';
import {GeodesyHelper} from './geodesy-helper';


describe('TrackFitter', () => {
    beforeEach(() => {
    });


    // region calcApproxBearingPos

    it('calculates an undefined bearing+pos based on 0 positions', () => {
        const bearPos = TrackFitter.calcApproxBearingPos([]);
        expect(bearPos).toBeUndefined();
    });


    it('calculates a 0 bearing+pos based on 1 position', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1]);
        expect(bearPos.bearing.deg).toBe(0);
        expect(bearPos.position).toEqual(pos1);
    });


    it('calculates a direct bearing+pos based on 2 position', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(7.1, 47.1);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2]);
        const bearing2 = GeodesyHelper.calcBearing(pos1, pos2);

        expect(bearPos.bearing.deg).toBe(bearing2.deg);
        expect(bearPos.position).toEqual(pos2);
    });


    it('calculates a circle bearing based on 3 position near erlach', () => {
        const pos1 = new Position2d(7.071426, 47.027690);
        const pos2 = new Position2d(7.074894, 47.039889);
        const pos3 = new Position2d(7.085692, 47.050945);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2, pos3]);

        expect(bearPos.bearing.deg).toBeCloseTo(43, -1);
        expect(bearPos.position).toEqual(pos3);
    });


    it('calculates a bearing based on 3 position near the equator', () => {
        const pos1 = new Position2d(9.762744, 0.429249);
        const pos2 = new Position2d(9.778973, 0.669567);
        const pos3 = new Position2d(9.893958, 0.863830);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2, pos3]);

        expect(bearPos.bearing.deg).toBeCloseTo(43, -1);
        expect(bearPos.position).toEqual(pos3);
    });


    it('calculates a direct bearing based on 5 nearly linear points', () => {
        const pos1 = new Position2d(6.9996, 46.6552);
        const pos2 = new Position2d(7.0223, 46.6669);
        const pos3 = new Position2d(7.0423, 46.6773);
        const pos4 = new Position2d(7.0653, 46.6892);
        const pos5 = new Position2d(7.0864, 46.7001);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2, pos3, pos4, pos5]);
        const directBear = GeodesyHelper.calcBearing(pos1, pos5);

        expect(bearPos.bearing.deg).toBe(directBear.deg);
        expect(bearPos.position.latitude).toBeCloseTo(pos5.latitude, 3);
        expect(bearPos.position.longitude).toBeCloseTo(pos5.longitude, 3);
    });


    it('calculates a bearing based on 5 position of a taxi track in lszb', () => {
        const pos1 = new Position2d(7.498810, 46.912790);
        const pos2 = new Position2d(7.498916, 46.912707);
        const pos3 = new Position2d(7.499273, 46.912487);
        const pos4 = new Position2d(7.499678, 46.912586);
        const pos5 = new Position2d(7.499892, 46.912707);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2, pos3, pos4, pos5]);

        expect(bearPos.bearing.deg).toBeCloseTo(30, -1);
        expect(bearPos.position.latitude).toBeCloseTo(pos5.latitude, 3);
        expect(bearPos.position.longitude).toBeCloseTo(pos5.longitude, 3);
    });


    it('calculates a bearing based on 4 position of a straight track in lsge', () => {
        const pos1 = new Position2d(6.126777, 46.250043);
        const pos2 = new Position2d(6.110511, 46.238964);
        const pos3 = new Position2d(6.098154, 46.230688);
        const pos4 = new Position2d(6.091362, 46.226048);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2, pos3, pos4]);

        expect(bearPos.bearing.deg).toBeCloseTo(226, -1);
        expect(bearPos.position.latitude).toBeCloseTo(pos4.latitude, 3);
        expect(bearPos.position.longitude).toBeCloseTo(pos4.longitude, 3);
    });


    it('calculates the head position for out of order positions (1-2-4-3)', () => {
        const pos1 = new Position2d(6.126777, 46.250043);
        const pos2 = new Position2d(6.110511, 46.238964);
        const pos3 = new Position2d(6.091362, 46.226048);
        const pos4 = new Position2d(6.098154, 46.230688);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2, pos3, pos4]);

        expect(bearPos.bearing.deg).toBeCloseTo(226, -1);
        expect(bearPos.position.latitude).toBeCloseTo(pos3.latitude, 3);
        expect(bearPos.position.longitude).toBeCloseTo(pos3.longitude, 3);
    });


    it('calculates a correct bearing orientation for out of order positions (1-2-4-5-3)', () => {
        const pos1 = new Position2d(7.645, 46.9281);
        const pos2 = new Position2d(7.6629, 46.9305);
        const pos3 = new Position2d(7.7116, 46.9196);
        const pos4 = new Position2d(7.6822, 46.9273);
        const pos5 = new Position2d(7.6984, 46.9264);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2, pos3, pos4, pos5]);

        expect(bearPos.bearing.deg).toBeGreaterThan(45);
        expect(bearPos.bearing.deg).toBeLessThan(135);
    });


    it('calculates a correct bearing orientation for out of order positions (2-1-5-3-4)', () => {
        const pos1 = new Position2d(7.26147, 47.13158);
        const pos2 = new Position2d(7.26313, 47.1259);
        const pos3 = new Position2d(7.264076, 47.138378);
        const pos4 = new Position2d(7.263724, 47.140614);
        const pos5 = new Position2d(7.263199, 47.136612);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2, pos3, pos4, pos5]);

        expect(bearPos.bearing.deg).toBeGreaterThan(0);
        expect(bearPos.bearing.deg).toBeLessThan(20);
    });


    xit('TEST', () => {
        const pos1 = new Position2d(7.42155, 47.182966666666665);
        const pos2 = new Position2d(7.4211833333333335, 47.18286666666667);
        const pos3 = new Position2d(7.420816666666667, 47.18275);
        const pos4 = new Position2d(7.419483333333333, 47.18233333333333);
        const pos5 = new Position2d(7.417466666666667, 47.18171666666667);
        // const pos5 = new Position2d(7.417560, 47.181610);
        const bearPos = TrackFitter.calcApproxBearingPos([pos1, pos2, pos3, pos4, pos5]);

        expect(bearPos.bearing.deg).toBeCloseTo(0, 100);
        expect(bearPos.position.latitude).toBeCloseTo(222, 100);
        expect(bearPos.position.longitude).toBeCloseTo(111, 100);
    });


    xit('TEST2', () => {
        const pos0 = new Position2d(7.26147, 47.13158);
        const pos1 = new Position2d(7.26313, 47.1259);
        const pos2 = new Position2d(7.264076, 47.138378);
        const pos3 = new Position2d(7.263724, 47.140614);
        const pos4 = new Position2d(7.263199, 47.136612);
        // const pos5 = new Position2d(7.262993, 47.139908);
        const bearPos = TrackFitter.calcApproxBearingPos([pos0, pos1, pos2, pos3, pos4]);

        expect(bearPos.bearing.deg).toBeCloseTo(0, 100);
        expect(bearPos.position.latitude).toBeCloseTo(222, 100);
        expect(bearPos.position.longitude).toBeCloseTo(111, 100);
    });

    // endregion
});
