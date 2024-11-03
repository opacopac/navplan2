import { Length } from "../../../geo-physics/domain/model/quantities/length";
import { Volume } from "../../../geo-physics/domain/model/quantities/volume";
import { Weight } from "../../../geo-physics/domain/model/quantities/weight";
import { WeightItem } from "../model/weight-item";
import { WeightItemType } from "../model/weight-item-type";


export class MockWeightItemsBr23 {
    public static createAll(): WeightItem[] {
        return [
            this.createAircraftItem(),
            this.createFuelItem(),
            this.createPilotItem(),
            this.createPassengerItem(),
            this.createBaggageLowerAftItem(),
            this.createBaggageUpperAftItem(),
            this.createBaggageWingLockerItem(),
        ];
    }


    public static createAircraftItem(): WeightItem {
        return new WeightItem(
            WeightItemType.AIRCRAFT,
            "Aircraft",
            Length.ofM(1.7364),
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
            Length.ofM(1.6),
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
            Length.ofM(2.085),
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
            Length.ofM(2.085),
            Length.ofZero(),
            null,
            null,
            Weight.ofKg(85),
            null,
            null,
            null
        );
    }


    public static createBaggageWingLockerItem(): WeightItem {
        return new WeightItem(
            WeightItemType.BAGGAGE,
            "Wing Lockers",
            Length.ofM(2.025),
            Length.ofZero(),
            Weight.ofKg(20),
            null,
            Weight.ofKg(0),
            null,
            null,
            null
        );
    }


    public static createBaggageLowerAftItem(): WeightItem {
        return new WeightItem(
            WeightItemType.BAGGAGE,
            "Lower Aft",
            Length.ofM(2.520),
            Length.ofZero(),
            Weight.ofKg(15),
            null,
            Weight.ofKg(0),
            null,
            null,
            null
        );
    }


    public static createBaggageUpperAftItem(): WeightItem {
        return new WeightItem(
            WeightItemType.BAGGAGE,
            "Lower Aft",
            Length.ofM(2.8),
            Length.ofZero(),
            Weight.ofKg(1),
            null,
            Weight.ofKg(0),
            null,
            null,
            null
        );
    }
}
