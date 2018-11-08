import * as ol from 'openlayers';
import {environment} from '../../../environments/environment';
import {Webcam} from '../model/webcam';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';


export class OlWebcam extends OlComponentBase {
    private readonly olFeature: ol.Feature;


    public constructor(
        public webcam: Webcam,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(webcam);
        this.olFeature.setStyle(this.createPointStyle());
        this.setPointGeometry(this.olFeature, webcam.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
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
                src: src + 'webcam.svg'
            }))
        });
    }
}
