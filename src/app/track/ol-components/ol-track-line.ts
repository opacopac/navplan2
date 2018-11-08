import * as ol from 'openlayers';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {Track} from '../model/track';


export class OlTrackLine extends OlComponentBase {
    private readonly lineFeature: ol.Feature;


    public constructor(
        private readonly track: Track,
        private readonly source: ol.source.Vector) {

        super();


        this.lineFeature = new ol.Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setLineGeometry(this.lineFeature, track.positionList);
        this.source.addFeature(this.lineFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    private getStyle(): ol.style.Style {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#0000FF',
                width: 3
            })
        });
    }
}
