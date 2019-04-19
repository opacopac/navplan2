import {Volume} from './volume';
import {VolumeUnit} from './units';


describe('Volume', () => {
    beforeEach(() => {
    });


    it('creates an instance', () => {
        const vol = new Volume(20, VolumeUnit.L);
        expect(vol).toBeDefined();
        expect(vol.getValue(VolumeUnit.L)).toEqual(20);
    });


    it('converts units', () => {
        const vol_l = new Volume(100, VolumeUnit.L);
        const vol_gal = new Volume(10, VolumeUnit.GAL);
        expect(vol_l.getValue(VolumeUnit.GAL)).toBeCloseTo(26.4172, 3);
        expect(vol_gal.getValue(VolumeUnit.L)).toBeCloseTo(37.8541, 3);
    });


    it('creates a clone', () => {
        const vol = new Volume(20, VolumeUnit.L);
        const vol_clone = vol.clone();
        expect(vol.getValue(VolumeUnit.L)).toEqual(vol_clone.getValue(VolumeUnit.L));
    });
});
