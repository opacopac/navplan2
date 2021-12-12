import {Stroke, Style} from 'ol/style';
import {Track} from '../../track/domain-model/track';
import {OlVectorLayer} from '../../base-map-view/ol-model/ol-vector-layer';
import {OlGeometry} from '../../base-map-view/ol-model/ol-geometry';
import {OlFeature} from '../../base-map-view/ol-model/ol-feature';


export class OlTrackLine {
    public static draw(
        track: Track,
        layer: OlVectorLayer
    ) {
        const lineFeature = new OlFeature(undefined, false);
        lineFeature.setStyle(this.getStyle());
        lineFeature.setGeometry(OlGeometry.fromLine(track.positionList));
        layer.addFeature(lineFeature);
    }


    private static getStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: '#0000FF',
                width: 3
            })
        });
    }
}
