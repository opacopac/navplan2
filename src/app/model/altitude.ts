import { UnitconversionService } from '../services/utils/unitconversion.service';


export class Altitude {
    public constructor(
        public altitudeMeter: number) {
    }


    public hasValue(): boolean {
        return this.altitudeMeter != null;
    }


    public getInMt(): number {
        return this.altitudeMeter;
    }


    public getInFt(): number {
        if (this.altitudeMeter != null) {
            return UnitconversionService.m2ft(this.altitudeMeter);
        } else {
            return undefined;
        }
    }
}
