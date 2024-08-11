import {WeightItem} from '../../../aircraft/domain/model/weight-item';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WeightItemType} from '../../../aircraft/domain/model/weight-item-type';
import {WeightUnit} from '../../../geo-physics/domain/model/quantities/weight-unit';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';
import {VolumeUnit} from '../../../geo-physics/domain/model/quantities/volume-unit';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {FuelType} from '../../../aircraft/domain/model/fuel-type';
import {Volume} from '../../../geo-physics/domain/model/quantities/volume';


export class PlanWnbService {
    public static readonly AVGAS_DENSITY_KG_PER_L = 0.72;
    public static readonly MOGAS_DENSITY_KG_PER_L = 0.72;
    public static readonly JET_DENSITY_KG_PER_L = 0.8;


    public static calcMoment(weightItem: WeightItem, weightUnit: WeightUnit, lengthUnit: LengthUnit): number {
        return weightItem.weight.getValue(weightUnit) * weightItem.arm.getValue(lengthUnit);
    }


    public static calcFuelWeight(fuel: Volume, fuelType: FuelType): Weight {
        switch (fuelType) {
            case FuelType.JET:
                return new Weight(fuel.getValue(VolumeUnit.L) * this.JET_DENSITY_KG_PER_L, WeightUnit.KG);
            case FuelType.MOGAS:
                return new Weight(fuel.getValue(VolumeUnit.L) * this.MOGAS_DENSITY_KG_PER_L, WeightUnit.KG);
            case FuelType.AVGAS:
            default:
                return new Weight(fuel.getValue(VolumeUnit.L) * this.AVGAS_DENSITY_KG_PER_L, WeightUnit.KG);
        }
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
                weightItems[weightItems.indexOf(wi)] = this.calcZeroFuelWeightItem(weightItems);
            }

            if (wi.type === WeightItemType.TAKEOFF_WEIGHT) {
                weightItems[weightItems.indexOf(wi)] = this.calcTakeoffWeightItem(weightItems, fuelType);
            }
        });
    }


    public static createWnbWeightItemsFromAircraft(aircraft: Aircraft): WeightItem[] {
        if (!aircraft || !aircraft.wnbWeightItems || aircraft.wnbWeightItems.length === 0) {
            return [];
        }

        const newWeightItems = aircraft.wnbWeightItems
            .map(wi => {
                const newWi = wi.clone();

                if (wi.type === WeightItemType.AIRCRAFT) {
                    newWi.weight = aircraft.bew;
                } else {
                    if (wi.defaultWeight) {
                        newWi.weight = wi.defaultWeight;
                    }
                    if (wi.defaultFuel) {
                        newWi.fuel = wi.defaultFuel;
                        newWi.weight = this.calcFuelWeight(wi.defaultFuel, aircraft.fuelType);
                    }
                }

                return newWi;
            });

        newWeightItems.push(this.calcZeroFuelWeightItem(newWeightItems));
        newWeightItems.push(this.calcTakeoffWeightItem(newWeightItems, aircraft.fuelType));
        newWeightItems.sort((a, b) => this.getSortWeight(a.type) - this.getSortWeight(b.type));

        return newWeightItems;
    }


    private static getSortWeight(weightItemType: WeightItemType): number {
        switch (weightItemType) {
            case WeightItemType.AIRCRAFT:
                return 1;
            case WeightItemType.PERSON:
                return 2;
            case WeightItemType.BAGGAGE:
                return 3;
            case WeightItemType.CUSTOM:
                return 4;
            case WeightItemType.ZERO_FUEL_WEIGHT:
                return 5;
            case WeightItemType.FUEL:
                return 6;
            case WeightItemType.TAKEOFF_WEIGHT:
                return 7;
            default:
                return 8;
        }
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
            .filter(wi => this.isFuelTypeItem(wi.type) && wi.fuel)
            .map(wi => this.calcFuelWeight(wi.fuel, fuelType))
            .map(w => w.getValue(weightUnit))
            .reduce((sum, cur) => sum + cur, 0);
        const fuelMomentValue = weightItems
            .filter(wi => this.isFuelTypeItem(wi.type) && wi.fuel)
            .map(wi => ({
                weight: this.calcFuelWeight(wi.fuel, fuelType),
                arm: wi.arm
            }))
            .map(wArm => wArm.weight.getValue(weightUnit) * wArm.arm.getValue(lengthUnit))
            .reduce((sum, cur) => sum + cur, 0);

        const zeroFuelWeightItem = weightItems.find(wi => wi.type === WeightItemType.ZERO_FUEL_WEIGHT);

        const takeoffWeightValue = fuelWeightValue + zeroFuelWeightItem.weight.getValue(weightUnit);
        const takeoffMoment = fuelMomentValue + this.calcMoment(zeroFuelWeightItem, weightUnit, lengthUnit);
        const takeoffArmValue = takeoffMoment / takeoffWeightValue;

        return new WeightItem(
            WeightItemType.TAKEOFF_WEIGHT,
            'Takeoff Weight',
            new Length(takeoffArmValue, lengthUnit),
            null,
            null,
            null,
            null,
            new Weight(takeoffWeightValue, weightUnit),
            null
        );
    }
}
