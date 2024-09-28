import { Consumption } from "../../../geo-physics/domain/model/quantities/consumption";
import { ConsumptionUnit } from "../../../geo-physics/domain/model/quantities/consumption-unit";
import { Speed } from "../../../geo-physics/domain/model/quantities/speed";
import { Weight } from "../../../geo-physics/domain/model/quantities/weight";
import { WeightUnit } from "../../../geo-physics/domain/model/quantities/weight-unit";
import { Aircraft } from "../model/aircraft";
import { FuelType } from "../model/fuel-type";
import { VehicleType } from "../model/vehicle-type";
import { MockWeightItemsBr23 } from "./mockWeightItemsBr23";


export class MockAircraftBr23 {
    public static create() {
        return new Aircraft(
            1,
            VehicleType.AIRPLANE,
            "HB-KGO",
            "BR23",
            Speed.ofKt(100),
            Consumption.ofLPerH(25),
            FuelType.MOGAS,
            Weight.ofKg(750),
            Weight.ofKg(450),
            null, // TODD
            null,
            null,
            null,
            MockWeightItemsBr23.createAll(),
            []
        );
    }
}
