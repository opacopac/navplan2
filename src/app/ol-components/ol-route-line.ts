import * as ol from 'openlayers';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Position2d} from '../model/geometry/position2d';
import {OlComponent} from './ol-component';
import {Flightroute2} from '../model/flightroute/flightroute2';
import {RxService} from '../services/utils/rx.service';
import {Waypoint2} from '../model/flightroute/waypoint2';
import {WaypointModification} from 'app/services/map/map-action.service';
import {MapContext} from '../services/map/map.service';


export class OlRouteLine extends OlComponent {
    private readonly lineFeature: ol.Feature;
    private readonly modifyInteraction: ol.interaction.Modify;
    private readonly modifyStartSource: Subject<ol.interaction.Modify.Event>;
    private readonly modifyEndSource: Subject<ol.interaction.Modify.Event>;
    private readonly modifyChangeSource: Subject<ol.events.Event>;
    private waypointListSubscription: Subscription;
    private modifyStartSubscription: Subscription;
    private modifyEndSubscription: Subscription;
    private modifyChangeSubscription: Subscription;


    public constructor(
        mapContext: MapContext,
        private readonly flightroute$: Observable<Flightroute2>,
        private readonly source: ol.source.Vector) {

        super(mapContext);

        // create line feature
        this.lineFeature = new ol.Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.source.addFeature(this.lineFeature);

        // add modify interaction to waypoint line
        this.modifyInteraction = new ol.interaction.Modify({
            deleteCondition : function() { return false; }, // no delete condition
            features: new ol.Collection([this.lineFeature])
        });
        this.mapContext.map.addInteraction(this.modifyInteraction);
        this.modifyStartSource = new Subject<ol.interaction.Modify.Event>();
        this.modifyInteraction.on('modifystart', (event) => {
            this.modifyStartSource.next(event as ol.interaction.Modify.Event);
        });
        this.modifyEndSource = new Subject<ol.interaction.Modify.Event>();
        this.modifyInteraction.on('modifyend', (event) => {
            this.modifyEndSource.next(event as ol.interaction.Modify.Event);
        });
        this.modifyChangeSource = new Subject<ol.events.Event>();

        // handle waypoint list changes
        const wpPosList$ = this.flightroute$
            .switchMap(route => route ? route.waypointList.positionList$ : RxService.getEternal<Position2d[]>([]));
        this.waypointListSubscription = this.flightroute$
            .switchMap(route => route ? route.waypointList.items$ : RxService.getEternal<Waypoint2[]>([]))
            .withLatestFrom(wpPosList$)
            .distinctUntilChanged()
            .subscribe(([wpList, wpPosList]) => {
                if (!wpList || wpPosList.length < 2) {
                    this.hideFeature(this.lineFeature);
                } else {
                    this.setLineGeometry(this.lineFeature, wpPosList);
                }
            });

        // handle line modifications (dragging)
        this.modifyStartSubscription = this.modifyStart$
            .subscribe((event) => {
                // this.lineFeature.getGeometry().on('change', this.onModifyChange.bind(this));
            });

        this.modifyChangeSubscription = this.modifyChange$
            .debounceTime(100)
            .distinctUntilChanged()
            .withLatestFrom(wpPosList$, this.flightroute$)
            .subscribe(([event, posList, flightroute]) => {
                /*const wpMod = this.findWaypointModification(
                    event.target as ol.geom.LineString,
                    posList);
                this.modifyFlightroute(flightroute, wpMod);*/
            });

        this.modifyEndSubscription = this.modifyEnd$
            .filter(event => event !== undefined && event.mapBrowserEvent !== undefined)
            .withLatestFrom(wpPosList$, this.flightroute$)
            .subscribe(([event, posList, flightroute]) => {
                // this.lineFeature.getGeometry().un('change', this.onModifyChange.bind(this));
                const wpMod = this.findWaypointModification(
                    event.features.getArray()[0].getGeometry() as ol.geom.LineString,
                    posList);
                this.mapContext.mapActionService.modifyFlightroute(flightroute, wpMod);
            });
    }


    public destroy() {
        this.modifyEndSubscription.unsubscribe();
        this.modifyChangeSubscription.unsubscribe();
        this.modifyStartSubscription.unsubscribe();
        this.waypointListSubscription.unsubscribe();
        this.mapContext.map.removeInteraction(this.modifyInteraction);
    }


    get modifyStart$(): Observable<ol.interaction.Modify.Event> {
        return this.modifyStartSource.asObservable();
    }


    get modifyEnd$(): Observable<ol.interaction.Modify.Event> {
        return this.modifyEndSource.asObservable();
    }


    get modifyChange$(): Observable<ol.events.Event> {
        return this.modifyChangeSource.asObservable();
    }


    private onModifyChange(event: ol.events.Event) {
        this.modifyChangeSource.next(event);
    }


    private getStyle(): ol.style.Style {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#FF00FF',
                width: 5
            })
        });
    }


    private findWaypointModification(featureGeometry: ol.geom.LineString, oldPosList: Position2d[]): WaypointModification {
        // find index of changed wp
        const newCoordinates = featureGeometry.getCoordinates();

        for (let i = 0; i < newCoordinates.length; i++) {
            if (i >= oldPosList.length || !oldPosList[i].equals(Position2d.createFromMercator(newCoordinates[i]), 4)) {
                return new WaypointModification(
                    i,
                    (oldPosList.length !== newCoordinates.length),
                    Position2d.createFromMercator(newCoordinates[i])
                );
            }
        }

        return undefined;
    }
}
