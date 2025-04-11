import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WnbEnvelopeAxisType} from './wnb-envelope-axis-type';
import {WnbLonEnvelopeCoordinate} from './wnb-lon-envelope-coordinate';
import {WnbLatEnvelopeCoordinate} from './wnb-lat-envelope-coordinate';

export class WnbEnvelope {
    constructor(
        public name: string,
        public axisType: WnbEnvelopeAxisType,
        public lonEnvelope: WnbLonEnvelopeCoordinate[],
        public latEnvelope: WnbLatEnvelopeCoordinate[]
    ) {
    }


    public clone(): WnbEnvelope {
        return new WnbEnvelope(
            this.name,
            this.axisType,
            this.lonEnvelope?.map(c => c.clone()),
            this.latEnvelope?.map(c => c.clone())
        );
    }


    public getMinArm(): Length {
        if (this.lonEnvelope.length === 0) {
            return null;
        }

        return this.lonEnvelope
            .map(c => c.armCg)
            .reduce((minArm, currArm) => minArm.m < currArm.m ? minArm : currArm);
    }


    public getMaxArm(): Length {
        if (this.lonEnvelope.length === 0) {
            return null;
        }

        return this.lonEnvelope
            .map(c => c.armCg)
            .reduce((maxArm, currArm) => maxArm.m > currArm.m ? maxArm : currArm);
    }


    public getMinWeight(): Weight {
        if (this.lonEnvelope.length === 0) {
            return null;
        }

        return this.lonEnvelope
            .map(c => c.weight)
            .reduce((minWeight, currWeight) => minWeight.kg < currWeight.kg ? minWeight : currWeight);
    }


    public getMaxWeight(): Weight {
        if (this.lonEnvelope.length === 0) {
            return null;
        }

        return this.lonEnvelope
            .map(c => c.weight)
            .reduce((maxWeight, currWeight) => maxWeight.kg > currWeight.kg ? maxWeight : currWeight);
    }
}
