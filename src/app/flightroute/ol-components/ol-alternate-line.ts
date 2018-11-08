import * as ol from 'openlayers';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {Flightroute} from '../model/flightroute';


export class OlAlternateLine extends OlComponentBase {
    private readonly lineFeature: ol.Feature;


    public constructor(
        private readonly flightroute: Flightroute,
        private readonly source: ol.source.Vector,
        private readonly snapToLayers: ol.layer.Vector[]) {

        super();

        this.lineFeature = new ol.Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setGeometry(this.lineFeature, flightroute);
        this.source.addFeature(this.lineFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    private setGeometry(lineFeature: ol.Feature, flightroute: Flightroute) {
        if (flightroute.waypoints.length > 0 && flightroute.alternate) {
            const pos1 = flightroute.waypoints[flightroute.waypoints.length - 1].position;
            const pos2 = flightroute.alternate.position;
            this.setLineGeometry(lineFeature, [pos1, pos2]);
        } else {
            this.hideFeature(lineFeature);
        }
    }


    private getStyle(): ol.style.Style {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#FF00FF',
                width: 4,
                lineDash: [10, 10]
            })
        });
    }
}
