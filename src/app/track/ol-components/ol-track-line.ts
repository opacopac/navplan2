import {Feature} from 'ol';
import {Stroke, Style} from 'ol/style';
import {Track} from '../domain-model/track';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlTrackLine {
    private readonly lineFeature: Feature;


    public constructor(
        private readonly track: Track,
        layer: VectorLayer
    ) {
        this.lineFeature = new Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.lineFeature.setGeometry(OlHelper.getLineGeometry(track.positionList));
        layer.getSource().addFeature(this.lineFeature);
    }


    private getStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: '#0000FF',
                width: 3
            })
        });
    }
}
