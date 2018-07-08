import * as ol from 'openlayers';
import {environment} from '../../../environments/environment';
import {Reportingpoint} from '../model/reportingpoint';
import {OlComponent} from '../../shared/ol-component/ol-component';


export class OlReportingPoint extends OlComponent {
    private readonly olFeature: ol.Feature;


    public constructor(
        reportingpoint: Reportingpoint,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(reportingpoint);
        this.olFeature.setStyle(this.createPointStyle(reportingpoint));
        this.setPointGeometry(this.olFeature, reportingpoint.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    public destroy() {
        this.removeFeature(this.olFeature, this.source);
    }


    private createPointStyle(rp: Reportingpoint): ol.style.Style {
        let src = environment.iconBaseUrl;

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
