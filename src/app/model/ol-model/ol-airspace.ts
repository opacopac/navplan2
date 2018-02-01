import * as ol from 'openlayers';
import { Airspace } from '../airspace';
import { OlFeaturePolygon } from './ol-feature';

export class OlAirspace extends OlFeaturePolygon {
    public constructor(
        private airspace: Airspace) {

        super();
    }


    protected getPolygon() {
        return this.airspace.polygon;
    }


    protected createPolygonStyle(): ol.style.Style {
        switch (this.airspace.category) {
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
