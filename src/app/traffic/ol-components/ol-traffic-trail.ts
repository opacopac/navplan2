import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {Traffic} from '../model/traffic';


const MAX_AGE_SEC_TRACK_DOT = 120;
const DOT_STYLE = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 2,
        fill: new ol.style.Fill({
            color: '#FF0000'
        })
    })
});


export class OlTrafficTrail extends OlComponent {
    private readonly dotFeatures: ol.Feature[];


    constructor(
        traffic: Traffic,
        private readonly source: ol.source.Vector) {

        super();

        this.dotFeatures = [];
        for (let i = traffic.positions.length - 1; i >= 0; i--) {
            const pos4d = traffic.positions[i].position;
            if (Date.now() - pos4d.timestamp.getMs() < MAX_AGE_SEC_TRACK_DOT * 1000) {
                const dotFeature = this.createFeature(traffic);
                dotFeature.setStyle(DOT_STYLE);
                this.setPointGeometry(dotFeature, pos4d);
                this.source.addFeature(dotFeature);
                this.dotFeatures.push(dotFeature);
            } else {
                break;
            }
        }
    }


    public get isSelectable(): boolean {
        return false;
    }
}
