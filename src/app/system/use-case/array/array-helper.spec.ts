import {ArrayHelper} from './array-helper';


class DummyClass {
    constructor() {}
}


describe('ArrayHelper', () => {
    beforeEach(() => {
    });


    // region mergeUnique

    it('merges distinct arrays correctly', () => {
        const dummy1 = new DummyClass();
        const dummy2 = new DummyClass();
        const dummy3 = new DummyClass();
        const dummy4 = new DummyClass();
        const arr1 = [dummy1, dummy2];
        const arr2 = [dummy3, dummy4];
        const arrResult = ArrayHelper.mergeUnique<DummyClass>(arr1, arr2);

        expect(arrResult.length).toBe(4);
        expect(arrResult[0]).toBe(dummy1);
        expect(arrResult[1]).toBe(dummy2);
        expect(arrResult[2]).toBe(dummy3);
        expect(arrResult[3]).toBe(dummy4);
    });


    it('merges non-distinct arrays correctly', () => {
        const dummy1 = new DummyClass();
        const dummy2 = new DummyClass();
        const dummy3 = new DummyClass();
        const arr1 = [dummy1, dummy2];
        const arr2 = [dummy3, dummy2];
        const arrResult = ArrayHelper.mergeUnique<DummyClass>(arr1, arr2);

        expect(arrResult.length).toBe(3);
        expect(arrResult[0]).toBe(dummy1);
        expect(arrResult[1]).toBe(dummy2);
        expect(arrResult[2]).toBe(dummy3);
    });


    it('merges a empty array correctly', () => {
        const dummy1 = new DummyClass();
        const dummy2 = new DummyClass();
        const arr1 = [dummy1, dummy2];
        const arr2 = [];
        const arrResult = ArrayHelper.mergeUnique<DummyClass>(arr1, arr2);

        expect(arrResult.length).toBe(2);
        expect(arrResult[0]).toBe(dummy1);
        expect(arrResult[1]).toBe(dummy2);
    });


    // endregion
});
