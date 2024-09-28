import { Length } from "../../../geo-physics/domain/model/quantities/length";
import { Volume } from "../../../geo-physics/domain/model/quantities/volume";
import { Weight } from "../../../geo-physics/domain/model/quantities/weight";
import { WeightItem } from "../model/weight-item";
import { WeightItemType } from "../model/weight-item-type";


export class MockWeightItemsBr23 {
    public static createAll(): WeightItem[] {
        return [
            MockWeightItemsBr23.createAircraftItem(),
            MockWeightItemsBr23.createFuelItem(),
            MockWeightItemsBr23.createPilotItem(),
            MockWeightItemsBr23.createPassengerItem(),
            MockWeightItemsBr23.createBaggageItem(),
        ];
    }


    public static createAircraftItem(): WeightItem {
        return new WeightItem(
            WeightItemType.AIRCRAFT,
            "Aircraft",
            Length.ofM(1.2), // TODO
            Length.ofZero(),
            null,
            null,
            null,
            null,
            null,
            null
        );
    }


    public static createFuelItem(): WeightItem {
        return new WeightItem(
            WeightItemType.FUEL,
            "Fuel Tanks (Wing)",
            Length.ofM(1.6), // TODO
            Length.ofZero(),
            null,
            Volume.ofL(120),
            null,
            null,
            null,
            null
        );
    }


    public static createPilotItem(): WeightItem {
        return new WeightItem(
            WeightItemType.PERSON,
            "Pilot",
            Length.ofM(1.68), // TODO
            Length.ofZero(),
            null,
            null,
            Weight.ofKg(85),
            null,
            null,
            null
        );
    }


    public static createPassengerItem(): WeightItem {
        return new WeightItem(
            WeightItemType.PERSON,
            "Passenger",
            Length.ofM(1.68), // TODO
            Length.ofZero(),
            null,
            null,
            Weight.ofKg(85),
            null,
            null,
            null
        );
    }


    public static createBaggageItem(): WeightItem {
        return new WeightItem(
            WeightItemType.BAGGAGE,
            "Wing Lockers",
            Length.ofM(1.7), // TODO
            Length.ofZero(),
            Weight.ofKg(20),
            null,
            Weight.ofKg(0),
            null,
            null,
            null
        );
    }
}
