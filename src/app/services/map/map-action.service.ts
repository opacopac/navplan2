import {Injectable} from '@angular/core';
import {SessionService} from '../session/session.service';
import {Sessioncontext} from '../../model/sessioncontext';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Position2d} from '../../model/position';
import {DataItem} from '../../model/data-item';
import {MapfeaturesService} from './mapfeatures.service';
import {WaypointFactory} from '../../model/waypoint-model/waypoint-factory';
import {Flightroute2} from '../../model/flightroute-model/flightroute2';


export class WaypointModification {
    constructor(
        public waypointIndex: number,
        public isNewWaypoint: boolean,
        public newPosition: Position2d) {}
}


@Injectable()
export class MapActionService {
    private session: Sessioncontext;
    public readonly mapItemClicked$: Observable<[DataItem, Position2d]>;
    private readonly mapItemClickedSource: Subject<[DataItem, Position2d]>;
    public readonly mapClicked$: Observable<Position2d>;
    private readonly mapClickedSource: Subject<Position2d>;
    public readonly mapOverlayClosed$: Observable<void>;
    private readonly mapOverlayClosedSource: Subject<void>;
    public readonly flightrouteModified$: Observable<WaypointModification>;
    private readonly flightrouteModifiedSource: Subject<WaypointModification>;


    constructor(
        private sessionService: SessionService,
        private mapFeatureService: MapfeaturesService) {

        this.session = this.sessionService.getSessionContext();
        this.mapItemClickedSource = new Subject<[DataItem, Position2d]>();
        this.mapItemClicked$ = this.mapItemClickedSource.asObservable();
        this.mapClickedSource = new Subject<Position2d>();
        this.mapClicked$ = this.mapClickedSource.asObservable();
        this.mapOverlayClosedSource = new Subject<void>();
        this.mapOverlayClosed$ = this.mapOverlayClosedSource.asObservable();
        this.flightrouteModifiedSource = new Subject<WaypointModification>();
        this.flightrouteModified$ = this.flightrouteModifiedSource.asObservable();
    }


    public modifyFlightroute(flightroute: Flightroute2, wpModification: WaypointModification) {
        if (flightroute && wpModification) {
            const dataItem = this.mapFeatureService.findFlightrouteFeatureByPosition(wpModification.newPosition);
            const newWp = WaypointFactory.createNewWaypointFromItem2(dataItem, wpModification.newPosition);
            if (wpModification.isNewWaypoint) {
                flightroute.waypointList.insert(newWp, wpModification.waypointIndex);
            } else {
                flightroute.waypointList.replace(wpModification.waypointIndex, newWp);
            }
        }
    }
}
