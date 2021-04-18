import {Feature} from 'ol';
import {Stroke, Style} from 'ol/style';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Track} from '../domain-model/track';
import VectorLayer from 'ol/layer/Vector';


export class OlTrackLine extends OlComponentBase {
    private readonly lineFeature: Feature;


    public constructor(
        private readonly track: Track,
        layer: VectorLayer
    ) {
        super();

        this.lineFeature = new Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setLineGeometry(this.lineFeature, track.positionList);
        layer.getSource().addFeature(this.lineFeature);
    }


    public get isSelectable(): boolean {
        return false;
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
