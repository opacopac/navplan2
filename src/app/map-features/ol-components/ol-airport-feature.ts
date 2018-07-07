import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { OlFeaturePoint } from '../../shared/model/ol-feature';
import { Position2d } from '../../shared/model/geometry/position2d';
import {AirportFeature} from '../model/airport';


export class OlAirportFeature extends OlFeaturePoint {
    public constructor(
        private airportFeature: AirportFeature) {

        super(airportFeature);
    }


    protected getPosition(): Position2d {
        return this.airportFeature.position;
    }


    protected createPointStyle(): ol.style.Style {
        const src = environment.iconBaseUrl;

        if (this.airportFeature.type !== 'PARACHUTE') {
            return undefined;
        }

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [45, 16],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                rotateWithView: false,
                opacity: 0.8,
                src: src + 'feature_parachute.png'
            }))
        });
    }
}
