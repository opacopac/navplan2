import {Fill, Stroke, Style} from 'ol/style';
import {Airspace} from '../../../enroute/domain-model/airspace';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';


export class OlAirspace {
    public static draw(
        airspace: Airspace,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(airspace, false);
        olFeature.setStyle(this.createPolygonStyle(airspace));
        olFeature.setGeometry(OlGeometry.fromPolygon(airspace.polygon));
        layer.addFeature(olFeature);
    }


    private static createPolygonStyle(airspace: Airspace): Style {
        switch (airspace.category) {
            case 'CTR':
                return new Style({
                    fill: new Fill({
                        color: 'rgba(152, 206, 235, 0.3)'
                    }),
                    stroke: new Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        width: 3,
                        lineDash: [10, 7]
                    })
                });
            case 'A':
                return new Style({
                    stroke: new Stroke({
                        color: 'rgba(174, 30, 34, 0.8)',
                        width: 3
                    })
                });
            case 'B':
            case 'C':
            case 'D':
                return new Style({
                    stroke: new Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        width: 3
                    })
                });
            case 'E':
                return new Style({
                    stroke: new Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        width: 2
                    })
                });
            case 'DANGER':
            case 'RESTRICTED':
            case 'PROHIBITED':
                return new Style({
                    stroke: new Stroke({
                        color: 'rgba(174, 30, 34, 0.8)',
                        width: 2
                    })
                });
            case 'TMZ':
            case 'RMZ':
            case 'FIZ':
                return new Style({
                    /*fill: new Fill({
                     color: 'rgba(152, 206, 235, 0.3)'
                     }),*/
                    stroke: new Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        // color: 'rgba(0, 0, 0, 1.0)',
                        width: 3,
                        lineDash: [1, 7]
                    })
                });
            case 'FIR':
            case 'UIR':
                return new Style({
                    /*fill: new Fill({
                     color: 'rgba(152, 206, 235, 0.3)'
                     }),*/
                    stroke: new Stroke({
                        color: 'rgba(0, 150, 64, 0.8)',
                        width: 3,
                        lineDash: [5, 20]
                    })
                });
            case 'GLIDING':
            case 'WAVE':
                return new Style({
                    stroke: new Stroke({
                        color: 'rgba(0, 150, 64, 0.8)',
                        width: 2
                    })
                });
            default:
                return undefined;
        }
    }
}
