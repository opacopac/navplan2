import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Userpoint } from '../model/userpoint';
import { OlFeaturePoint } from '../../shared/model/ol-feature';
import { Position2d } from '../../shared/model/geometry/position2d';


export class OlUserPoint extends OlFeaturePoint {
    public constructor(
        public userPoint: Userpoint) {

        super(userPoint);
    }


    protected getPosition(): Position2d {
        return this.userPoint.position;
    }


    protected createPointStyle(): ol.style.Style {
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
                text: this.userPoint.name,
                fill: new ol.style.Fill({color: '#0077FF'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}
