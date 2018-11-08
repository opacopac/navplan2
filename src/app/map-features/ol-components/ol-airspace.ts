import * as ol from 'openlayers';
import {Airspace} from '../model/airspace';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';


export class OlAirspace extends OlComponentBase {
    private readonly olFeature: ol.Feature;


    public constructor(
        airspace: Airspace,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(airspace);
        this.olFeature.setStyle(this.createPolygonStyle(airspace));
        this.setPolygonGeometry(this.olFeature, airspace.polygon);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    private createPolygonStyle(airspace: Airspace): ol.style.Style {
        switch (airspace.category) {
            case 'CTR':
                return new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(152, 206, 235, 0.3)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        width: 3,
                        lineDash: [10, 7]
                    })
                });
            case 'A':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(174, 30, 34, 0.8)',
                        width: 3
                    })
                });
            case 'B':
            case 'C':
            case 'D':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        width: 3
                    })
                });
            case 'E':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        width: 2
                    })
                });
            case 'DANGER':
            case 'RESTRICTED':
            case 'PROHIBITED':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(174, 30, 34, 0.8)',
                        width: 2
                    })
                });
            case 'TMZ':
            case 'RMZ':
            case 'FIZ':
                return new ol.style.Style({
                    /*fill: new ol.style.Fill({
                     color: 'rgba(152, 206, 235, 0.3)'
                     }),*/
                    stroke: new ol.style.Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        // color: 'rgba(0, 0, 0, 1.0)',
                        width: 3,
                        lineDash: [1, 7]
                    })
                });
            case 'FIR':
            case 'UIR':
                return new ol.style.Style({
                    /*fill: new ol.style.Fill({
                     color: 'rgba(152, 206, 235, 0.3)'
                     }),*/
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 150, 64, 0.8)',
                        width: 3,
                        lineDash: [5, 20]
                    })
                });
            case 'GLIDING':
            case 'WAVE':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 150, 64, 0.8)',
                        width: 2
                    })
                });
            default:
                return undefined;
        }
    }
}
