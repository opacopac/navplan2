import * as ol from 'openlayers';
import {MetarTaf} from '../model/metar-taf';
import {OlMetarSky} from './ol-metar-sky';
import {OlMetarWind} from './ol-metar-wind';
import {OlFeature} from '../../shared/model/ol-feature';


export class OlMetar extends OlFeature {
    public constructor(
        private metarTaf: MetarTaf,
        private mapRotationRad: number) {

        super(metarTaf);
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
