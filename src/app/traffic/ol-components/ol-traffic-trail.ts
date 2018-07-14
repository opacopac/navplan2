import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {Traffic, TrafficAircraftType} from '../model/traffic';


const MAX_AGE_SEC_TRACK_DOT = 120;


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
                dotFeature.setStyle(this.getStyle(traffic));
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


    destroy() {
        this.removeFeatures(this.dotFeatures, this.source);
    }


    private getStyle(traffic: Traffic): ol.style.Style {
        let color: string;

        if (traffic.actype === TrafficAircraftType.OWN) {
            color = '#0000FF';
        } else {
            color = '#FF0000';
        }

        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 2,
                fill: new ol.style.Fill({
                    color: color
                })
            })
        });
    }
}
