import * as ol from 'openlayers';
import {MapContext} from '../services/map/map.service';
import {Observable} from 'rxjs/Observable';
import {OlComponent} from './ol-component';
import {Traffic, TrafficAircraftType} from '../model/traffic';
import {Subscription} from 'rxjs/Subscription';


const MAX_AGE_SEC_TRACK_DOT = 120;


export class OlTrafficTrail extends OlComponent {
    private readonly dotFeatures: ol.Feature[];
    private trafficSubscription: Subscription;

    constructor(
        mapContext: MapContext,
        private readonly traffic$: Observable<Traffic>,
        private readonly source: ol.source.Vector) {

        super(mapContext);

        this.dotFeatures = [];
        this.trafficSubscription = this.traffic$.subscribe((traffic) => {
            // remove old dot trail
            this.removeFeatures(this.dotFeatures, this.source);
            this.dotFeatures.splice(0, this.dotFeatures.length);

            // add new dot trail
            if (traffic && traffic.positions && traffic.positions.length > 0) {
                for (let i = traffic.positions.length - 1; i >= 0; i--) {
                    const pos4d = traffic.positions[i].position;
                    if (Date.now() - pos4d.timestamp.getMs() < MAX_AGE_SEC_TRACK_DOT * 1000) {
                        const dotFeature = this.createFeature(this.traffic$);
                        dotFeature.setStyle(this.getStyle(traffic));
                        this.setPointGeometry(dotFeature, pos4d);
                        this.source.addFeature(dotFeature);
                        this.dotFeatures.push(dotFeature);
                    } else {
                        break;
                    }
                }
            }
        });
    }


    destroy() {
        this.trafficSubscription.unsubscribe();
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
