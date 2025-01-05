import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class AirportRunway {
    constructor(
        public name: string,
        public surface: string,
        public length: Length,
        public width: Length,
        public direction: number,
        public tora: Length,
        public lda: Length,
        public papi: boolean,
    ) {
    }


    // TODO: assume partial wrong openaip-data: if direction matches the runway name, then no mag var is included
    public directionContainsMagneticVariation(): boolean {
        if (!this.name || this.direction % 10 !== 0) {
            return true;
        }

        const dir1txt = (this.direction / 10).toString();

        return this.name.indexOf(dir1txt) === -1;
    }


    public isGrass(): boolean {
        return this.surface === 'GRAS';
    }
}
