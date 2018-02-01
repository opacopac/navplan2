import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { MetarTaf } from '../metar-taf';
import { OlFeaturePoint } from './ol-feature';


export class OlMetarTaf extends OlFeaturePoint {
    public constructor(
        private metarTaf: MetarTaf) {

        super();
    }


    protected getPosition() {
        return undefined; // TODO
    }


    protected createPointStyle(): ol.style.Style {
        const src = environment.iconBaseUrl;

        return undefined; // TODO
    }
}
