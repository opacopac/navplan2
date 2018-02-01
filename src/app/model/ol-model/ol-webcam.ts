import { environment } from '../../../environments/environment';
import { Position2d } from '../position';
import { Webcam } from '../webcam';
import { OlClickableFeature, OlFeaturePoint } from './ol-feature';
import * as ol from 'openlayers';


export class OlWebcam extends OlFeaturePoint implements OlClickableFeature {
    public constructor(
        private webcam: Webcam) {

        super(webcam);
    }


    public onFeatureClicked() {
        // TODO
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
