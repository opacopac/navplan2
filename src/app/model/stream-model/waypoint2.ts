import * as Rx from 'rxjs';
import { WaypointAltitude2 } from "./waypoint-altitude2";
import { Position2d } from "../position";
import { GeocalcService } from "../../services/utils/geocalc.service";
import { Waypointtype } from "../waypoint";


export class Waypoint2 {
    public readonly type$: Rx.Observable<Waypointtype>;
    private readonly typeSource: Rx.BehaviorSubject<Waypointtype>;
    public readonly freq$: Rx.Observable<string>;
    private readonly freqSource: Rx.BehaviorSubject<string>;
    public readonly callsign$: Rx.Observable<string>;
    private readonly callsignSource: Rx.BehaviorSubject<string>;
    public readonly checkpoint$: Rx.Observable<string>;
    private readonly checkpointSource: Rx.BehaviorSubject<string>;
    public readonly remark$: Rx.Observable<string>;
    private readonly remarkSource: Rx.BehaviorSubject<string>;
    public readonly supp_info$: Rx.Observable<string>;
    private readonly supp_infoSource: Rx.BehaviorSubject<string>;
    public readonly position$: Rx.Observable<Position2d>;
    private readonly positionSource: Rx.BehaviorSubject<Position2d>;
    public readonly alt$: Rx.Observable<WaypointAltitude2>;
    private readonly altSource: Rx.BehaviorSubject<WaypointAltitude2>;
    public readonly previousPosition$: Rx.Observable<Position2d>;
    private readonly previousPositionObservable$: Rx.Observable<Rx.Observable<Position2d>>;
    private readonly previousPositionObservableSource: Rx.BehaviorSubject<Rx.Observable<Position2d>>;
    public readonly speed$: Rx.Observable<number>;
    private readonly speedObservable$: Rx.Observable<Rx.Observable<number>>;
    private readonly speedObservableSource: Rx.BehaviorSubject<Rx.Observable<number>>;
    public readonly mt$: Rx.Observable<number>;
    public readonly nextMt$: Rx.Observable<number>;
    private readonly nextMtObservable$: Rx.Observable<Rx.Observable<number>>;
    private readonly nextMtObservableSource: Rx.BehaviorSubject<Rx.Observable<number>>;
    public readonly dist$: Rx.Observable<number>;
    public readonly legTime$: Rx.Observable<number>;
    public readonly vacTime$: Rx.Observable<number>;
    public readonly variation$: Rx.Observable<number>;


    constructor(
        type,
        freq = '',
        callsign = '',
        checkpoint = '',
        remark = '',
        supp_info = '',
        position?: Position2d,
        alt: WaypointAltitude2 = new WaypointAltitude2()) {
        this.typeSource = new Rx.BehaviorSubject<Waypointtype>(type);
        this.type$ = this.typeSource.asObservable();
        this.freqSource = new Rx.BehaviorSubject<string>(freq);
        this.freq$ = this.freqSource.asObservable();
        this.callsignSource = new Rx.BehaviorSubject<string>(callsign);
        this.callsign$ = this.callsignSource.asObservable();
        this.checkpointSource = new Rx.BehaviorSubject<string>(checkpoint);
        this.checkpoint$ = this.checkpointSource.asObservable();
        this.remarkSource = new Rx.BehaviorSubject<string>(remark);
        this.remark$ = this.remarkSource.asObservable();
        this.supp_infoSource = new Rx.BehaviorSubject<string>(supp_info);
        this.supp_info$ = this.supp_infoSource.asObservable();
        this.positionSource = new Rx.BehaviorSubject<Position2d>(position);
        this.position$ = this.positionSource.asObservable();
        this.altSource = new Rx.BehaviorSubject<WaypointAltitude2>(alt);
        this.alt$ = this.altSource.asObservable();
        this.previousPositionObservableSource = new Rx.BehaviorSubject<Rx.Observable<Position2d>>(undefined);
        this.previousPositionObservable$ = this.previousPositionObservableSource.asObservable();
        this.previousPosition$ = this.previousPositionObservable$.flatMap(prevPosObs => prevPosObs);
        this.speedObservableSource = new Rx.BehaviorSubject<Rx.Observable<number>>(undefined);
        this.speedObservable$ = this.speedObservableSource.asObservable();
        this.speed$ = this.speedObservable$.flatMap(speedObs => speedObs);
        this.nextMtObservableSource = new Rx.BehaviorSubject<Rx.Observable<number>>(undefined);
        this.nextMtObservable$ = this.nextMtObservableSource.asObservable();
        this.nextMt$ = this.nextMtObservable$.flatMap(nextMtObs => nextMtObs);
        this.variation$ = this.position$.map((pos) => this.calcVariation(pos));
        this.mt$ = Rx.Observable.combineLatest(
            this.previousPosition$,
            this.position$,
            this.variation$,
            (pos1, pos2, magVar) => {
                return GeocalcService.getBearing(pos1, pos2, magVar);
            }
        );
        this.dist$ = Rx.Observable.combineLatest(
            this.previousPosition$,
            this.position$,
            (pos1, pos2) => {
                return GeocalcService.getDistance(pos1, pos2);
            }
        );
        this.legTime$ = Rx.Observable.combineLatest(
            this.dist$,
            this.speed$,
            (distance, speed) => {
                return this.calcLegTime_min(distance, speed);
            }
        );
        this.vacTime$ = Rx.Observable.of(0); // TODO
    }


    set type(value: Waypointtype) {
        this.typeSource.next(value);
    }


    set freq(value: string) {
        this.freqSource.next(value);
    }


    set callsign(value: string) {
        this.callsignSource.next(value);
    }


    set checkpoint(value: string) {
        this.checkpointSource.next(value);
    }


    set remark(value: string) {
        this.remarkSource.next(value);
    }


    set supp_info(value: string) {
        this.supp_infoSource.next(value);
    }


    set position(value: Position2d) {
        this.positionSource.next(value);
    }


    set alt(value: WaypointAltitude2) {
        this.altSource.next(value);
    }


    set previousPositionObservable(value: Rx.Observable<Position2d>) {
        this.previousPositionObservableSource.next(value);
    }


    set speedObservable(value: Rx.Observable<number>) {
        this.speedObservableSource.next(value);
    }


    set nextMtObservable(value: Rx.Observable<number>) {
        this.nextMtObservableSource.next(value);
    }


    private calcVariation(position: Position2d): number {
        return 0; // TODO
    }


    private calcLegTime_min(distance_nm: number, speed_kt: number): number {
        if (!distance_nm || !speed_kt) {
            return undefined;
        }

        return distance_nm / speed_kt * 60;
    }

    //TODO: get texts

    /*public mt: number = 0;
    public mtText = '';
    public vacTime = 0;
    public dist: number;
    public distText = '';
    public alt: Waypointaltitude = new Waypointaltitude();
    public eetText = '';
    public variation: number = 0;
    public isNew: boolean = false;
        public freq = '',
        public callsign = '',
        public checkpoint = '',
        public remark = '',
        public supp_info = '',
        public position?: Position2d*/
}
