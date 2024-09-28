import { Consumption } from "../../../geo-physics/domain/model/quantities/consumption";
import { Speed } from "../../../geo-physics/domain/model/quantities/speed";
import { Weight } from "../../../geo-physics/domain/model/quantities/weight";
import { Aircraft } from "../model/aircraft";
import { FuelType } from "../model/fuel-type";
import { VehicleType } from "../model/vehicle-type";
import { MockDistPerfTablesBr23 } from "./mockDistPerfTablesBr23";
import { MockWeightItemsBr23 } from "./mockWeightItemsBr23";
import { MockWnbEnvelopeBr23 } from "./MockWnbEnvelopeBr23";


export class MockAircraftBr23 {
    public static MTOW = Weight.ofKg(750);
    public static BEW = Weight.ofKg(450);


    public static create() {
        return new Aircraft(
            1,
            VehicleType.AIRPLANE,
            "HB-KGO",
            "BR23",
            Speed.ofKt(100),
            Consumption.ofLPerH(25),
            FuelType.MOGAS,
            this.MTOW,
            this.BEW,
            MockDistPerfTablesBr23.createTakeoffGroundRoll(),
            MockDistPerfTablesBr23.createTakeoffDistance15ft(),
            MockDistPerfTablesBr23.createLandingGroundRoll(),
            MockDistPerfTablesBr23.createLandingGroundRoll(),
            MockWeightItemsBr23.createAll(),
            MockWnbEnvelopeBr23.createAll()
        );
    }
}
