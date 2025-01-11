import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class AirportRunway {
    private static GRASS_TYPE_TEXT = 'GRAS'; // TODO => enum
    private static THRESHOLD_STRIPES_BY_WIDTH_M = [
        [4, 18],
        [6, 23],
        [8, 30],
        [12, 45],
        [16, 60]
    ];

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


    public isGrass(): boolean {
        return this.surface === AirportRunway.GRASS_TYPE_TEXT;
    }


    public getThresholdStripeCount(): number {
        const narrowestRwyEntry = AirportRunway.THRESHOLD_STRIPES_BY_WIDTH_M[0];
        const widestRwyEntry = AirportRunway.THRESHOLD_STRIPES_BY_WIDTH_M[AirportRunway.THRESHOLD_STRIPES_BY_WIDTH_M.length - 1];
        if (!this.width || this.width.m < narrowestRwyEntry[1]) {
            return 0;
        }
        if (this.width.m > widestRwyEntry[1]) {
            return widestRwyEntry[0];
        }

        return AirportRunway.THRESHOLD_STRIPES_BY_WIDTH_M.find(([stripes, widthM]) => widthM >= this.width.m)[0];
    }


    // TODO: assume partial wrong openaip-data: if direction matches the runway name, then no mag var is included
    public directionContainsMagneticVariation(): boolean {
        if (!this.name || this.direction % 10 !== 0) {
            return true;
        }

        const dir1txt = (this.direction / 10).toString();

        return this.name.indexOf(dir1txt) === -1;
    }
}
