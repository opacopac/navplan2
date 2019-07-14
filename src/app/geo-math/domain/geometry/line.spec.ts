import {Position2d} from './position2d';
import {Geometry2dType} from './geometry2d';
import {Line} from './line';


describe('Line', () => {
    let pos1, pos2: Position2d;

    beforeEach(() => {
        pos1 = new Position2d(7.0, 47.0);
        pos2 = new Position2d(8.0, 48.0);
    });


    it('can create an instance', () => {
        const line = new Line(pos1, pos2);
        expect(line).toBeDefined();
        expect(line.pos1).toEqual(pos1);
        expect(line.pos2).toEqual(pos2);
        expect(line.getGeometryType()).toEqual(Geometry2dType.LINE);
    });


    it('can be cloned', () => {
        const line = new Line(pos1, pos2);
        const line_clone = line.clone();

        expect(line_clone).toBeDefined();
        expect(line.pos1).toEqual(line_clone.pos1);
        expect(line.pos2).toEqual(line_clone.pos2);
    });
});
