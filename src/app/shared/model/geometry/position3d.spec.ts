import {Geometry2dType} from "./geometry2d";
import {Position3d} from "./position3d";
import {Altitude} from "../quantities/altitude";
import {LengthUnit} from "../units";

describe('Position3d', () => {
    beforeEach(() => {
    });


    it('can create an instance', () => {
        const pos = new Position3d(7.0, 47.0, new Altitude(500, LengthUnit.FT));

        expect(pos).toBeDefined();
        expect(pos.longitude).toEqual(7.0);
        expect(pos.latitude).toEqual(47.0);
        expect(pos.altitude).toEqual(new Altitude(500, LengthUnit.FT));
        expect(pos.getGeometryType()).toEqual(Geometry2dType.POSITION);
    });


    it('indicates if an altitude is set', () => {
        const pos1 = new Position3d(7.0, 47.0, new Altitude(500, LengthUnit.FT));
        const pos2 = new Position3d(7.0, 47.0, undefined);
        const pos3 = new Position3d(7.0, 47.0, null);

        expect(pos1.hasAltitude()).toBeTruthy();
        expect(pos2.hasAltitude()).toBeFalsy();
        expect(pos3.hasAltitude()).toBeFalsy();
    });


    it('can be cloned', () => {
        const pos = new Position3d(7.0, 47.0, new Altitude(500, LengthUnit.FT));
        const pos2 = pos.clone();

        expect(pos2).toBeDefined();
        expect(pos2.longitude).toEqual(pos.longitude);
        expect(pos2.latitude).toEqual(pos.latitude);
        expect(pos2.altitude).toEqual(pos.altitude);
    });
});
