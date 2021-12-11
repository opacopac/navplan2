import {Stroke, Style} from 'ol/style';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';


export class OlAlternateLine {
    public static draw(
        flightroute: Flightroute,
        layer: OlVectorLayer
    ) {
        if (flightroute.waypoints.length > 0 && flightroute.alternate) {
            const lineFeature = new OlFeature(undefined, false);
            lineFeature.setStyle(this.getStyle());
            lineFeature.setGeometry(OlGeometry.fromLine([
                flightroute.waypoints[flightroute.waypoints.length - 1].position,
                flightroute.alternate.position
            ]));
            layer.addFeature(lineFeature);
        }
    }


    private static getStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: '#FF00FF',
                width: 4,
                lineDash: [10, 10]
            })
        });
    }
}
