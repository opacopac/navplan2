import * as ol from 'openlayers';
import { MetarTaf } from '../metar-taf';
import { OlFeature } from './ol-feature';
import { OlMetarSky } from './ol-metar-sky';
import { OlMetarWind } from './ol-metar-wind';


export class OlMetar extends OlFeature {
    public constructor(
        private metarTaf: MetarTaf,
        private mapRotationRad: number) {

        super();
    }


    public draw(source: ol.source.Vector) {
        // sky conditions
        const skycondFeature = new OlMetarSky(this.metarTaf);
        skycondFeature.draw(source);


        // wind
        const windFeature = new OlMetarWind(this.metarTaf, this.mapRotationRad);
        windFeature.draw(source);
    }
}
