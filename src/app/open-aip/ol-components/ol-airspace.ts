import {Feature} from 'ol';
import {Fill, Stroke, Style} from 'ol/style';
import {Airspace} from '../domain-model/airspace';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import VectorLayer from 'ol/layer/Vector';


export class OlAirspace extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        airspace: Airspace,
        layer: VectorLayer
    ) {
        super();

        this.olFeature = this.createFeature(airspace);
        this.olFeature.setStyle(this.createPolygonStyle(airspace));
        this.setPolygonGeometry(this.olFeature, airspace.polygon);
        layer.getSource().addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    private createPolygonStyle(airspace: Airspace): Style {
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
