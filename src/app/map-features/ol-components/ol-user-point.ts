import * as ol from 'openlayers';
import {environment} from '../../../environments/environment';
import {Userpoint} from '../model/userpoint';
import {OlComponent} from '../../shared/ol-component/ol-component';


export class OlUserPoint extends OlComponent {
    private readonly olFeature: ol.Feature;


    public constructor(
        userPoint: Userpoint,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(userPoint);
        this.olFeature.setStyle(this.createPointStyle(userPoint));
        this.setPointGeometry(this.olFeature, userPoint.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    protected createPointStyle(userPoint: Userpoint): ol.style.Style {
        const src = environment.iconBaseUrl;

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 0.75,
                src: src + 'wp_user.png'
            })),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: userPoint.name,
                fill: new ol.style.Fill({color: '#0077FF'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}
