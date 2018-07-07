import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Reportingpoint } from '../model/reportingpoint';
import { OlFeaturePoint } from '../../shared/model/ol-feature';


export class OlReportingPoint extends OlFeaturePoint {
    public constructor(
        public reportingpoint: Reportingpoint) {

        super(reportingpoint);
    }


    protected getPosition() {
        return this.reportingpoint.position;
    }


    protected createPointStyle(): ol.style.Style {
        let src = environment.iconBaseUrl;
        const rp = this.reportingpoint;

        if ((rp.inbd_comp && rp.outbd_comp) || (rp.inbd_comp == null && rp.outbd_comp == null)) {
            src += 'rp_comp.png';
        } else if (rp.inbd_comp || rp.outbd_comp) {
            src += 'rp_inbd.png';
        } else {
            src += 'rp.png';
        }


        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 0.75,
                src: src
            })),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: rp.name,
                fill: new ol.style.Fill({color: '#0077FF'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}
