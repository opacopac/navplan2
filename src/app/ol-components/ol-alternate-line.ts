import * as ol from 'openlayers';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';
import {OlComponent} from './ol-component';
import {Waypoint2} from '../model/flightroute/waypoint2';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {MapContext} from 'app/core/services/map/map.service';


export class OlAlternateLine extends OlComponent {
    private readonly lineFeature: ol.Feature;
    private posSubscription: Subscription;


    public constructor(
        mapContext: MapContext,
        private readonly alternateWaypoint$: Observable<Waypoint2>,
        private readonly lastRouteWaypoint$: Observable<Waypoint2>,
        private readonly source: ol.source.Vector) {

        super(mapContext);

        // create line feature
        this.lineFeature = new ol.Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.source.addFeature(this.lineFeature);

        // handle position changes
        this.posSubscription = Observable.combineLatest(
            this.alternateWaypoint$.switchMap((wp) => wp ? wp.position$ : Observable.of(undefined)),
            this.lastRouteWaypoint$.switchMap((wp) => wp ? wp.position$ : Observable.of(undefined))
        )
        .distinctUntilChanged()
            .subscribe(([altPos, prevPos]) => {
                if (!altPos || !prevPos) {
                    this.hideFeature(this.lineFeature);
                } else {
                    this.setLineGeometry(this.lineFeature, [prevPos, altPos]);
                }
            });
    }


    public destroy() {
        this.posSubscription.unsubscribe();
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
