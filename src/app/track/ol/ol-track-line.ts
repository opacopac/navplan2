import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Stroke, Style} from 'ol/style';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {Track} from '../domain/track';


export class OlTrackLine extends OlComponentBase {
    private readonly lineFeature: Feature;


    public constructor(
        private readonly track: Track,
        private readonly source: Vector) {

        super();


        this.lineFeature = new Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setLineGeometry(this.lineFeature, track.positionList);
        this.source.addFeature(this.lineFeature);
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
