import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position2d } from '../position';
import { Webcam } from '../webcam';
import { OlFeaturePoint } from './ol-feature';


export class OlWebcam extends OlFeaturePoint {
    public constructor(
        public webcam: Webcam) {

        super(webcam);
    }


    protected getPosition(): Position2d {
        return this.webcam.position;
    }


    protected createPointStyle(): ol.style.Style {
        const src = environment.iconBaseUrl;

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 0.9,
                src: src + 'webcam.png'
            }))
        });
    }
}
