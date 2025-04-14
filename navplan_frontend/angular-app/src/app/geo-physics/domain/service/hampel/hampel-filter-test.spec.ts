import {HampelFilter} from './hampel-filter';

describe('HampelFilter', () => {
    beforeEach(() => {
    });


    it('it filters an outliers in the middle', () => {
        // given
        const sensorSpeeds = [10, 12, 14, 100, 15, 13, 11, 90, 12, 14];
        const windowSize = 4;
        const threshold = 5;

        // when
        const filteredSpeeds = HampelFilter.filter(sensorSpeeds, windowSize, threshold);

        // then
        expect(filteredSpeeds).toEqual([10, 12, 14, 15, 13, 11, 12, 14]);
    });


    it('it filters an outlier in the beginning and end', () => {
        // given
        const sensorSpeeds = [100, 10, 12, 14, 15, 13, 11, 13, 12, 14, 100];
        const windowSize = 4;
        const threshold = 5;

        // when
        const filteredSpeeds = HampelFilter.filter(sensorSpeeds, windowSize, threshold);

        // then
        expect(filteredSpeeds).toEqual([10, 12, 14, 15, 13, 11, 13, 12, 14]);
    });


    it('it does not filter if there are no outliers', () => {
        // given
        const sensorSpeeds = [10, 12, 14, 15, 13, 11, 13, 12, 14];
        const windowSize = 4;
        const threshold = 5;

        // when
        const filteredSpeeds = HampelFilter.filter(sensorSpeeds, windowSize, threshold);

        // then
        expect(filteredSpeeds).toEqual(sensorSpeeds);
    });
});
