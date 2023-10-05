import {Vector3d} from './vector3d';


describe('Vector3d', () => {
    beforeEach(() => {
    });


    it('creates an instance', () => {
        const vect = new Vector3d(1, -2, 3);

        expect(vect).toBeDefined();
        expect(vect.x).toEqual(1);
        expect(vect.y).toEqual(-2);
        expect(vect.z).toEqual(3);
    });


    it('multiplies the vector by a factor', () => {
        const vect1 = new Vector3d(1, -2, 3);
        const vect2 = new Vector3d(1, -2, 3);

        const vect1b = vect1.multiply(2);
        const vect2b = vect2.multiply(0.5);

        expect(vect1b.x).toEqual(2);
        expect(vect1b.y).toEqual(-4);
        expect(vect1b.z).toEqual(6);
        expect(vect2b.x).toEqual(0.5);
        expect(vect2b.y).toEqual(-1);
        expect(vect2b.z).toEqual(1.5);
    });


    it('calculates the vector length', () => {
        const vect1 = new Vector3d(1, 0, -1);
        const vect2 = new Vector3d(2, 0, 0);

        const len1 = vect1.length();
        const len2 = vect2.length();

        expect(len1).toEqual(Math.sqrt(2));
        expect(len2).toEqual(2);
    });


    it('normalizes the vector', () => {
        const vect1 = new Vector3d(1, 0, -1);
        const vect2 = new Vector3d(2, 0, 0);

        const normVect1 = vect1.normalize();
        const normVect2 = vect2.normalize();

        expect(normVect1.length()).toBeCloseTo(1, 10);
        expect(normVect1.x).toEqual(1 / Math.sqrt(2));
        expect(normVect1.y).toEqual(0);
        expect(normVect1.z).toEqual(-1 / Math.sqrt(2));
        expect(normVect2.length()).toBeCloseTo(1, 10);
        expect(normVect2.x).toEqual(1);
        expect(normVect2.y).toEqual(0);
        expect(normVect2.z).toEqual(0);
    });


    it('calculates the cross product', () => {
        const vect1 = new Vector3d(1, 0, 0);
        const vect2 = new Vector3d(0, 1, 0);

        const cross1 = vect1.cross(vect2);
        const cross2 = vect2.cross(vect1);

        expect(cross1.x).toEqual(0);
        expect(cross1.y).toEqual(0);
        expect(cross1.z).toEqual(1);
        expect(cross2.x).toEqual(0);
        expect(cross2.y).toEqual(0);
        expect(cross2.z).toEqual(-1);
    });
});
