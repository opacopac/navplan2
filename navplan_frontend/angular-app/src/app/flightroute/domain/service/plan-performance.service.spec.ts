import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';

describe('PlanPerformanceService', () => {
    beforeEach(() => {
    });


    it('calculates the correct altitude for standard pressure at sea level', () => {
        // given
        const elevation = Length.createZero();
        const qnh = AtmosphereService.getStandardPressure();

        // when
        const pa = AtmosphereService.calcPressureAltitude(elevation, qnh);

        // then
        expect(pa.value).toBe(0);
    });
});
