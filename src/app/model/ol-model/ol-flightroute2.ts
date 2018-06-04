import * as ol from "openlayers";
import { Flightroute2 } from "../stream-model/flightroute2";
import { OlBase2 } from "./ol-base2";
import { OlWaypoint2 } from "./ol-waypoint2";
import { Waypoint2 } from "../stream-model/waypoint2";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';


export class OlFlightroute2 extends OlBase2 {
    private waypointListSubscription: Subscription;
    private alternateSubscription: Subscription;
    private readonly waypointLineOlFeature: ol.Feature;
    private readonly alternateLineOlFeature: ol.Feature;
    private readonly waypointOlFeatureList: OlWaypoint2[];
    private alternateOlFeature: OlWaypoint2;


    public constructor(
        private readonly flightroute: Flightroute2,
        private readonly source: ol.source.Vector,
        private readonly mapRotation_rad$: Observable<number>) {

        super();

        // create line features, apply styles & add to source
        this.waypointLineOlFeature = this.createFeature(this.flightroute);
        this.waypointLineOlFeature.setStyle(this.getLineStyle());
        this.alternateLineOlFeature = this.createFeature(this.flightroute);
        this.alternateLineOlFeature.setStyle(this.getAlternateLineStyle());
        this.source.addFeatures([this.waypointLineOlFeature, this.alternateLineOlFeature]);

        // init waypoint features
        this.waypointOlFeatureList = [];
        this.alternateOlFeature = undefined;

        // handle waypoint list changes
        const wpPosList$ = this.flightroute.waypointList.items$
            .flatMap(wpList =>
                Observable.combineLatest(
                    wpList.map(wp => wp.position$)
                )
            );
        this.waypointListSubscription = this.flightroute.waypointList.items$
            .withLatestFrom(wpPosList$)
            .distinctUntilChanged()
            .subscribe(([waypointList, wpPosList]) => {
                this.updateWaypointList(waypointList);
                if (wpPosList.length < 2) {
                    this.hideFeature(this.waypointLineOlFeature);
                } else {
                    this.setLineGeometry(this.waypointLineOlFeature, wpPosList)
                }
            });

        // handle alternate changes
        /*this.alternateSubscription =*/ Observable.combineLatest(
            this.flightroute.alternate$,
            this.flightroute.alternate$.flatMap(alternate => alternate ? alternate.position$ : undefined),
            this.flightroute.alternate$.flatMap(alternate => alternate ? alternate.previousPosition$ : undefined));
            //.distinctUntilChanged()
            /*.subscribe(([alternate, position, previousPosition]) => {
                this.updateAlternate(alternate);
                if (!position || !previousPosition) {
                    this.hideFeature(this.alternateLineOlFeature);
                } else {
                    this.setLineGeometry(this.alternateLineOlFeature, [previousPosition, position]);
                }
            });*/
    }


    public destroy() {
        if (this.alternateOlFeature) { this.alternateOlFeature.destroy(); }
        this.waypointOlFeatureList.forEach((waypoint) => waypoint.destroy());
        this.waypointListSubscription.unsubscribe();
        //this.alternateSubscription.unsubscribe();
    }


    private updateWaypointList(wpList: Waypoint2[]) {
        this.waypointOlFeatureList.forEach(waypoint => waypoint.destroy());
        this.waypointOlFeatureList.splice(0, this.waypointOlFeatureList.length); // clear array

        wpList.forEach((waypoint) => {
            this.waypointOlFeatureList.push(
                new OlWaypoint2(waypoint, this.source, this.mapRotation_rad$)
            )
        });
    }


    private updateAlternate(wp: Waypoint2) {
        if (this.alternateOlFeature) {
            this.alternateOlFeature.destroy();
        }
        if (wp) {
            this.alternateOlFeature = new OlWaypoint2(wp, this.source, this.mapRotation_rad$)
        }
        this.alternateOlFeature = new OlWaypoint2(wp, this.source, this.mapRotation_rad$)
    }


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
