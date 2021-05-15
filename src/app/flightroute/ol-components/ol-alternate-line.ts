import {Feature} from 'ol';
import {Stroke, Style} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import {Flightroute} from '../domain-model/flightroute';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlAlternateLine {
    private readonly lineFeature: Feature;


    public constructor(
        private readonly flightroute: Flightroute,
        layer: VectorLayer
    ) {
        this.lineFeature = new Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setGeometry(this.lineFeature, flightroute);
        layer.getSource().addFeature(this.lineFeature);
    }


    private setGeometry(lineFeature: Feature, flightroute: Flightroute) {
        if (flightroute.waypoints.length > 0 && flightroute.alternate) {
            lineFeature.setGeometry(OlHelper.getLineGeometry([
                flightroute.waypoints[flightroute.waypoints.length - 1].position,
                flightroute.alternate.position
            ]));
        } else {
            lineFeature.setGeometry(undefined);
        }
    }


    private getStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: '#FF00FF',
                width: 4,
                lineDash: [10, 10]
            })
        });
    }
}
