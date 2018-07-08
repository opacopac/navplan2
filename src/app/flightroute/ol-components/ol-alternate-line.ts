import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {Observable, Subscription} from 'rxjs';
import {Waypoint} from '../model/waypoint';
import {MapContext} from '../../map/model/map-context';


export class OlAlternateLine extends OlComponent {
    private readonly lineFeature: ol.Feature;
    private posSubscription: Subscription;


    public constructor(
        private mapContext: MapContext,
        private readonly alternateWaypoint$: Observable<Waypoint>,
        private readonly lastRouteWaypoint$: Observable<Waypoint>,
        private readonly source: ol.source.Vector) {

        super();

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


    public get isSelectable(): boolean {
        return false;
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
