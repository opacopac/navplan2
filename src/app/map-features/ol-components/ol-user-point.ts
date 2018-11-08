import * as ol from 'openlayers';
import {Userpoint} from '../model/userpoint';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {UserpointIcon} from '../model/userpoint-icon';


export class OlUserPoint extends OlComponentBase {
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
        const src = UserpointIcon.getUrl();

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 0.9,
                src: src
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
