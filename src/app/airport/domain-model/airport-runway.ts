import {Length} from '../../common/geo-math/domain-model/quantities/length';


export class AirportRunway {
    constructor(
        public name: string,
        public surface: string,
        public length: Length,
        public width: Length,
        public direction1: number,
        public direction2: number,
        public tora1: Length,
        public tora2: Length,
        public lda1: Length,
        public lda2: Length,
        public papi1: boolean,
        public papi2: boolean) {
    }


    // TODO: assume partial wrong openaip-data: if direction matches the runway name, then no mag var is included
    public directionContainsMagneticVariation(): boolean {
        if (!this.name || this.direction1 % 10 !== 0 || this.direction2 % 10 !== 0) {
            return true;
        }

        const dir1txt = (this.direction1 / 10).toString();
        const dir2txt = (this.direction2 / 10).toString();

        return (this.name.indexOf(dir1txt) === -1 || this.name.indexOf(dir2txt) === -1);
    }
}
