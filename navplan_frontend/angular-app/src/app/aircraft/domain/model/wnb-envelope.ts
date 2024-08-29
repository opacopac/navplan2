import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WnbEnvelopeAxisType} from './wnb-envelope-axis-type';
import {WnbEnvelopeCoordinate} from './wnb-envelope-coordinate';

export class WnbEnvelope {
    constructor(
        public name: string,
        public axisType: WnbEnvelopeAxisType,
        public coordinates: WnbEnvelopeCoordinate[],
    ) {
    }


    public clone(): WnbEnvelope {
        return new WnbEnvelope(
            this.name,
            this.axisType,
            this.coordinates?.map(c => c.clone())
        );
    }


    public getMinArm(): Length {
        return this.coordinates
            .map(c => c.armCg)
            .reduce((minArm, currArm) => minArm.m < currArm.m ? minArm : currArm);
    }


    public getMaxArm(): Length {
        return this.coordinates
            .map(c => c.armCg)
            .reduce((maxArm, currArm) => maxArm.m > currArm.m ? maxArm : currArm);
    }


    public getMinWeight(): Weight {
        return this.coordinates
            .map(c => c.weight)
            .reduce((minWeight, currWeight) => minWeight.kg < currWeight.kg ? minWeight : currWeight);
    }


    public getMaxWeight(): Weight {
        return this.coordinates
            .map(c => c.weight)
            .reduce((maxWeight, currWeight) => maxWeight.kg > currWeight.kg ? maxWeight : currWeight);
    }
}
