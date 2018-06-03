import * as Rx from "rxjs/Rx";
import * as ol from "openlayers";
import { Flightroute2 } from "../stream-model/flightroute2";
import { OlBase2 } from "./ol-base2";
import { OlWaypoint2 } from "./ol-waypoint2";
import { Waypoint2 } from "../stream-model/waypoint2";


export class OlFlightroute2 extends OlBase2 {
    private waypointListSubscription: Rx.Subscription;
    private alternateSubscription: Rx.Subscription;
    private readonly waypointLineFeature: ol.Feature;
    private readonly alternateLineFeature: ol.Feature;
    private readonly waypointFeatureList: OlWaypoint2[];
    private readonly alternateFeature: OlWaypoint2;


    public constructor(
        private readonly flightroute$: Rx.Observable<Flightroute2>,
        private readonly source: ol.source.Vector,
        private readonly mapRotation$: Rx.Observable<number>) {

        super();

        this.waypointLineFeature = this.createFeature(this.flightroute$);
        this.waypointLineFeature.setStyle(this.getLineStyle());
        this.alternateLineFeature = this.createFeature(this.flightroute$);
        this.alternateLineFeature.setStyle(this.getAlternateLineStyle());
        this.source.addFeatures([this.waypointLineFeature, this.alternateLineFeature]);

        this.waypointFeatureList = [];
        this.alternateFeature = new OlWaypoint2(
            this.flightroute$.flatMap(route => route.alternate$), source, mapRotation$);

        // waypoint list changes
        const wpPosList$ = this.flightroute$
            .flatMap(route => route.waypointList$)
            .flatMap(wpList =>
                Rx.Observable.combineLatest(
                    wpList.map(wp => wp.position$)
                )
            );
        this.waypointListSubscription = this.flightroute$
            .flatMap(route => Rx.Observable.combineLatest(route.waypointList$))
            .withLatestFrom(wpPosList$)
            .distinctUntilChanged()
            .subscribe(([waypointList$, wpPosList]) => {
                //this.updateWaypointList(waypointList$); // TODO
                if (wpPosList.length < 2) {
                    this.hideFeature(this.waypointLineFeature);
                } else {
                    this.setLineGeometry(this.waypointLineFeature, wpPosList)
                }
            });

        // alternate changes
        this.alternateSubscription = this.flightroute$
            .flatMap(route => route.alternate$)
            .flatMap(alternate =>
                Rx.Observable.combineLatest(
                    alternate.position$,
                    alternate.previousPosition$)
            )
            .distinctUntilChanged()
            .subscribe(([position, previousPosition]) => {
                if (!position || !previousPosition) {
                    this.hideFeature(this.alternateLineFeature);
                } else {
                    this.setLineGeometry(this.alternateLineFeature, [previousPosition, position]);
                }
            });
    }


    public destroy() {
        this.alternateFeature.destroy();
        this.waypointFeatureList.forEach((waypoint) => waypoint.destroy());
        this.waypointListSubscription.unsubscribe();
        this.alternateSubscription.unsubscribe();
    }


    /*private updateWaypointList(waypointList$: Rx.Observable<Waypoint2[]>) {
        this.waypointFeatureList.forEach(waypoint => waypoint.destroy());
        this.waypointFeatureList.splice(0, this.waypointFeatureList.length); // clear array

        waypointList$.forEach((waypoint) => {
            this.waypointFeatureList.push(
                new OlWaypoint2(waypoint.waypoint$, this.source, this.mapRotation$)
            )
        });
    }*/


    private getLineStyle(): ol.style.Style {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#FF00FF',
                width: 5
            })
        });
    }


    private getAlternateLineStyle(): ol.style.Style {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#FF00FF',
                width: 4,
                lineDash: [10, 10]
            })
        });
    }
}
