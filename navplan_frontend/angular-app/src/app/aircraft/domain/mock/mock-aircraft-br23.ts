import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {Aircraft} from '../model/aircraft';
import {FuelType} from '../model/fuel-type';
import {VehicleType} from '../model/vehicle-type';
import {MockPerfDistTablesBr23} from '../../../aircraft-performance/domain/mock/mock-perf-dist-tables-br23';
import {MockWeightItemsBr23} from '../../../aircraft-wnb/domain/mock/mock-weight-items-br23';
import {MockWnbEnvelopeBr23} from '../../../aircraft-wnb/domain/mock/mock-wnb-envelope-br23';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class MockAircraftBr23 {
    public static MTOW = Weight.ofKg(750);
    public static BEW = Weight.ofKg(450);
    public static ROC_SEALEVEL = Speed.ofKt(688);
    public static SERVICE_CEILING = Length.ofFt(14000);
    public static CRUISE_CLIMB_SPEED = Speed.ofKt(75);


    public static create() {
        return new Aircraft(
            1,
            VehicleType.AIRPLANE,
            'HB-KGO',
            'BR23',
            Speed.ofKt(100),
            Consumption.ofLPerH(25),
            FuelType.MOGAS,
            this.MTOW,
            this.BEW,
            this.ROC_SEALEVEL,
            this.SERVICE_CEILING,
            this.CRUISE_CLIMB_SPEED,
            MockPerfDistTablesBr23.createTakeoffGroundRoll(),
            MockPerfDistTablesBr23.createTakeoffDistance15ft(),
            MockPerfDistTablesBr23.createLandingGroundRoll(),
            MockPerfDistTablesBr23.createLandingGroundRoll(),
            MockWeightItemsBr23.createAll(),
            MockWnbEnvelopeBr23.createAll()
        );
    }
}
