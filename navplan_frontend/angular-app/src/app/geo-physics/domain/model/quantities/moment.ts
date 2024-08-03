import {Clonable} from '../../../../system/domain/model/clonable';
import {AbstractQuantity} from './abstract-quantity';
import {MomentUnit} from './moment-unit';


export class Moment extends AbstractQuantity<Moment, MomentUnit> implements Clonable<Moment> {
    public static readonly INLBS_PER_KGM = 86.796109862;


    public static getUnitString(unit: MomentUnit): string {
        switch (unit) {
            case MomentUnit.KGM:
                return 'kg m';
            case MomentUnit.INLBS:
                return 'in lbs';
        }
    }


    public static convertMoment(
        value: number,
        unit: MomentUnit,
        convertToUnit: MomentUnit
    ): number {
        if (unit === convertToUnit) {
            return value;
        }
        if (value === undefined) {
            return undefined;
        }

        switch (unit) {
            case MomentUnit.KGM:
                switch (convertToUnit) {
                    case MomentUnit.INLBS:
                        return value * Moment.INLBS_PER_KGM;
                    default:
                        return undefined;
                }

            case MomentUnit.INLBS:
                switch (convertToUnit) {
                    case MomentUnit.KGM:
                        return value / Moment.INLBS_PER_KGM;
                    default:
                        return undefined;
                }

            default:
                return undefined;
        }
    }


    public getValue(asUnit: MomentUnit): number {
        return Moment.convertMoment(this.value, this.unit, asUnit);
    }


    public get kgM(): number {
        return this.getValue(MomentUnit.KGM);
    }


    public get inLbs(): number {
        return this.getValue(MomentUnit.INLBS);
    }


    public clone(): Moment {
        return new Moment(this.value, this.unit);
    }


    protected createInstance(value: number, unit: MomentUnit): Moment {
        return new Moment(value, unit);
    }


    protected getDefaultUnit(): MomentUnit {
        return MomentUnit.KGM;
    }
}
