import {CircleFitter} from './geometry/circle-fitter';


describe('CircleFitter', () => {
    let cf: CircleFitter;


    beforeEach(() => {
        cf = new CircleFitter();
    });


    it('has no result for 0 points', () => {
        const result = cf.compute();

        expect(result.success).toBeFalsy();
    });


    it('has no result for 1 point', () => {
        cf.addPoint(0, 1);
        const result = cf.compute();

        expect(result.success).toBeFalsy();
    });


    it('has no result for 2 points', () => {
        cf.addPoint(0, 1);
        cf.addPoint(1, 0);
        const result = cf.compute();

        expect(result.success).toBeFalsy();
    });


    it('fits a circle for 3 points', () => {
        cf.addPoint(0, 1);
        cf.addPoint(1, 0);
        cf.addPoint(-1, 0);
        const result = cf.compute();

        expect(result.success).toBeTruthy();
        expect(result.center.x).toBeCloseTo(0, 0.00001);
        expect(result.center.y).toBeCloseTo(0, 0.00001);
        expect(result.radius).toBeCloseTo(1, 0.00001);
    });


    it('fits another circle for 3 points', () => {
        cf.addPoint(0.1, 1.1);
        cf.addPoint(0.9, -0.1);
        cf.addPoint(-1.1, 0.1);
        const result = cf.compute();

        expect(result.success).toBeTruthy();
        expect(result.center.x).toBeCloseTo(0, 0.2);
        expect(result.center.y).toBeCloseTo(0, 0.2);
        expect(result.radius).toBeCloseTo(1, 0.2);
    });


    it('has no result for 3 points on a line', () => {
        cf.addPoint(0, 0);
        cf.addPoint(1, 0);
        cf.addPoint(-1, 0);
        const result = cf.compute();

        expect(result.success).toBeFalsy();
    });


    it('has a result for 3 points nearly on a line', () => {
        cf.addPoint(-1, 0);
        cf.addPoint(0, 0.01);
        cf.addPoint(1, 0);
        const result = cf.compute();

        expect(result.success).toBeTruthy();
    });


    it('fits a circle for 4 points', () => {
        cf.addPoint(0, 1);
        cf.addPoint(1, 0);
        cf.addPoint(-1, 0);
        cf.addPoint(0, -1);
        const result = cf.compute();

        expect(result.success).toBeTruthy();
        expect(result.center.x).toBeCloseTo(0, 0.00001);
        expect(result.center.y).toBeCloseTo(0, 0.00001);
        expect(result.radius).toBeCloseTo(1, 0.00001);
    });
});
