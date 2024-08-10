import {WeightItem} from '../../../aircraft/domain/model/weight-item';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WeightItemType} from '../../../aircraft/domain/model/weight-item-type';
import {WeightUnit} from '../../../geo-physics/domain/model/quantities/weight-unit';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';
import {VolumeUnit} from '../../../geo-physics/domain/model/quantities/volume-unit';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {FuelType} from '../../../aircraft/domain/model/fuel-type';


export class PlanWnbService {
    public static calcMoment(weightItem: WeightItem, weightUnit: WeightUnit, lengthUnit: LengthUnit): number {
        return weightItem.weight.getValue(weightUnit) * weightItem.arm.getValue(lengthUnit);
    }


    public static calcFuelWeight(weightItem: WeightItem, fuelType: FuelType, weightUnit: WeightUnit): WeightItem {
        switch (fuelType) {
            case FuelType.MOGAS:
            case FuelType.AVGAS:
            default:
                if (weightItem.fuel) {
                    weightItem.weight = new Weight(weightItem.fuel.getValue(VolumeUnit.L) * 0.72, weightUnit);
                }
                if (weightItem.maxFuel) {
                    weightItem.maxWeight = new Weight(weightItem.maxFuel.getValue(VolumeUnit.L) * 0.72, weightUnit);
                }
                break;
        }

        return weightItem;
    }


    public static isFuelTypeItem(weightItemType: WeightItemType): boolean {
        return weightItemType === WeightItemType.FUEL;
    }


    public static isSummaryTypeItem(weightItemType: WeightItemType): boolean {
        return weightItemType === WeightItemType.ZERO_FUEL_WEIGHT
            || weightItemType === WeightItemType.TAKEOFF_WEIGHT;
    }


    public static isWeightTypeItem(weightItemType: WeightItemType): boolean {
        return weightItemType === WeightItemType.AIRCRAFT
            || weightItemType === WeightItemType.PERSON
            || weightItemType === WeightItemType.BAGGAGE
            || weightItemType === WeightItemType.CUSTOM;
    }


    public static reCalcSummaryWeightItems(weightItems: WeightItem[], fuelType: FuelType): void {
        weightItems.forEach(wi => {
            if (wi.type === WeightItemType.ZERO_FUEL_WEIGHT) {
                wi.applyValuesFrom(this.calcZeroFuelWeightItem(weightItems));
            }

            if (wi.type === WeightItemType.TAKEOFF_WEIGHT) {
                wi.applyValuesFrom(this.calcTakeoffWeightItem(weightItems, fuelType));
            }
        });
    }


    public static createWnbWeightItemsFromAircraft(aircraft: Aircraft): WeightItem[] {
        const newWeightItems = aircraft.wnbWeightItems
            .map(wi => {
                const newWi = wi.clone();

                if (newWi.type === WeightItemType.AIRCRAFT) {
                    newWi.weight = aircraft.bew;
                } // else: set default values

                return newWi;
            });

        newWeightItems.push(this.calcZeroFuelWeightItem(newWeightItems));
        newWeightItems.push(this.calcTakeoffWeightItem(newWeightItems, aircraft.fuelType));

        return newWeightItems;
    }


    private static calcZeroFuelWeightItem(weightItems: WeightItem[]): WeightItem {
        const weightUnit = WeightUnit.KG;
        const lengthUnit = LengthUnit.M;
        const zeroFuelWeightValue = weightItems
            .filter(wi => this.isWeightTypeItem(wi.type) && wi.weight)
            .map(wi => wi.weight.getValue(weightUnit))
            .reduce((sum, cur) => sum + cur, 0);
        const zeroFuelMomentValue = weightItems
            .filter(wi => this.isWeightTypeItem(wi.type) && wi.weight)
            .map(wi => this.calcMoment(wi, weightUnit, lengthUnit))
            .reduce((sum, cur) => sum + cur, 0);
        const zeroFuelArmValue = zeroFuelMomentValue / zeroFuelWeightValue;

        return new WeightItem(
            WeightItemType.ZERO_FUEL_WEIGHT,
            'Zero Fuel Weight',
            new Length(zeroFuelArmValue, lengthUnit),
            null,
            null,
            new Weight(zeroFuelWeightValue, weightUnit),
            null
        );
    }


    private static calcTakeoffWeightItem(weightItems: WeightItem[], fuelType: FuelType): WeightItem {
        const weightUnit = WeightUnit.KG;
        const lengthUnit = LengthUnit.M;
        const fuelWeightValue = weightItems
            .filter(wi => this.isFuelTypeItem(wi.type) && wi.weight)
            .map(wi => this.calcMoment(wi, weightUnit, lengthUnit))
            .reduce((sum, cur) => sum + cur, 0);
        const fuelMomentValue = weightItems
            .filter(wi => this.isFuelTypeItem(wi.type) && wi.fuel)
            .map(wi => this.calcFuelWeight(wi, fuelType, weightUnit))
            .map(wi => this.calcMoment(wi, weightUnit, lengthUnit))
            .reduce((sum, cur) => sum + cur, 0);

        const zeroFuelWeightItem = weightItems.find(wi => wi.type === WeightItemType.ZERO_FUEL_WEIGHT);

        const takeoffWeightValue = fuelWeightValue + zeroFuelWeightItem.weight.getValue(weightUnit);
        const takeoffMoment = fuelMomentValue + zeroFuelWeightItem.weight.getValue(weightUnit);
        const takeoffArmValue = takeoffMoment / takeoffWeightValue;

        return new WeightItem(
            WeightItemType.TAKEOFF_WEIGHT,
            'Takeoff Weight',
            new Length(takeoffArmValue, lengthUnit),
            null,
            null,
            new Weight(takeoffWeightValue, weightUnit),
            null
        );
    }
}
