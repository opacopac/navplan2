import * as ol from 'openlayers';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Waypoint} from '../model/waypoint';
import {MapContext} from '../../map/model/map-context';


export class OlAlternateLine extends OlComponent {
    private readonly lineFeature: ol.Feature;
    private posSubscription: Subscription;


    public constructor(
        mapContext: MapContext,
        private readonly alternateWaypoint$: Observable<Waypoint>,
        private readonly lastRouteWaypoint$: Observable<Waypoint>,
        private readonly source: ol.source.Vector) {

        super(mapContext);

        // create line feature
        this.lineFeature = new ol.Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.source.addFeature(this.lineFeature);

        // handle position changes
        /*this.posSubscription = Observable.combineLatest(
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
            });*/
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
