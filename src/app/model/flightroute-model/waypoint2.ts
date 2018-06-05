import { WaypointAltitude2 } from "./waypoint-altitude2";
import { Position2d } from "../position";
import { GeocalcService } from "../../services/utils/geocalc.service";
import { Waypointtype } from "../waypoint";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import {Time} from "../units/time";
import {Distance} from "../units/distance";
import {Speed} from "../units/speed";
import {Angle} from "../units/angle";
import {AngleUnit, LengthUnit, SpeedUnit, TimeUnit} from "../../services/utils/unitconversion.service";


export class Waypoint2 {
    public readonly type$: Observable<Waypointtype>;
    private readonly typeSource: BehaviorSubject<Waypointtype>;
    public readonly freq$: Observable<string>;
    private readonly freqSource: BehaviorSubject<string>;
    public readonly callsign$: Observable<string>;
    private readonly callsignSource: BehaviorSubject<string>;
    public readonly checkpoint$: Observable<string>;
    private readonly checkpointSource: BehaviorSubject<string>;
    public readonly remark$: Observable<string>;
    private readonly remarkSource: BehaviorSubject<string>;
    public readonly supp_info$: Observable<string>;
    private readonly supp_infoSource: BehaviorSubject<string>;
    public readonly position$: Observable<Position2d>;
    private readonly positionSource: BehaviorSubject<Position2d>;
    public readonly alt: WaypointAltitude2;
    public readonly previousPosition$: Observable<Position2d>;
    private readonly previousPositionObservable$: Observable<Observable<Position2d>>;
    private readonly previousPositionObservableSource: BehaviorSubject<Observable<Position2d>>;
    public readonly speed$: Observable<Speed>;
    private readonly speedObservable$: Observable<Observable<Speed>>;
    private readonly speedObservableSource: BehaviorSubject<Observable<Speed>>;
    public readonly mt$: Observable<Angle>;
    public readonly nextMt$: Observable<Angle>;
    private readonly nextMtObservable$: Observable<Observable<Angle>>;
    private readonly nextMtObservableSource: BehaviorSubject<Observable<Angle>>;
    public readonly dist$: Observable<Distance>;
    public readonly legTime$: Observable<Time>;
    public readonly vacTime$: Observable<Time>;
    public readonly variation$: Observable<Angle>;


    constructor(
        type,
        freq = '',
        callsign = '',
        checkpoint = '',
        remark = '',
        supp_info = '',
        position?: Position2d,
        alt: WaypointAltitude2 = new WaypointAltitude2()) {
        this.typeSource = new BehaviorSubject<Waypointtype>(type);
        this.type$ = this.typeSource.asObservable();
        this.freqSource = new BehaviorSubject<string>(freq);
        this.freq$ = this.freqSource.asObservable();
        this.callsignSource = new BehaviorSubject<string>(callsign);
        this.callsign$ = this.callsignSource.asObservable();
        this.checkpointSource = new BehaviorSubject<string>(checkpoint);
        this.checkpoint$ = this.checkpointSource.asObservable();
        this.remarkSource = new BehaviorSubject<string>(remark);
        this.remark$ = this.remarkSource.asObservable();
        this.supp_infoSource = new BehaviorSubject<string>(supp_info);
        this.supp_info$ = this.supp_infoSource.asObservable();
        this.positionSource = new BehaviorSubject<Position2d>(position);
        this.position$ = this.positionSource.asObservable();
        this.alt = alt;
        this.previousPositionObservableSource = new BehaviorSubject<Observable<Position2d>>(undefined);
        this.previousPositionObservable$ = this.previousPositionObservableSource.asObservable();
        this.previousPosition$ = this.previousPositionObservable$.flatMap(prevPosObs => prevPosObs ? prevPosObs : Observable.of(undefined));
        this.speedObservableSource = new BehaviorSubject<Observable<Speed>>(Observable.of(undefined));
        this.speedObservable$ = this.speedObservableSource.asObservable();
        this.speed$ = this.speedObservable$.flatMap(speedObs => speedObs ? speedObs : Observable.of(undefined));
        this.nextMtObservableSource = new BehaviorSubject<Observable<Angle>>(Observable.of(undefined));
        this.nextMtObservable$ = this.nextMtObservableSource.asObservable();
        this.nextMt$ = this.nextMtObservable$.flatMap(nextMtObs => nextMtObs ? nextMtObs : Observable.of(undefined));
        this.variation$ = this.position$.map((pos) => this.calcVariation(pos));
        this.mt$ = Observable.combineLatest(
            this.previousPosition$,
            this.position$,
            this.variation$,
            (pos1, pos2, magVar) => {
                return GeocalcService.getBearing(pos1, pos2, magVar);
            }
        );
        this.dist$ = Observable.combineLatest(
            this.previousPosition$,
            this.position$,
            (pos1, pos2) => {
                return GeocalcService.getDistance(pos1, pos2);
            }
        );
        this.legTime$ = Observable.combineLatest(
            this.dist$,
            this.speed$,
            (distance, speed) => {
                return this.calcLegTime(distance, speed);
            }
        );
        this.vacTime$ = Observable.of(new Time(0, TimeUnit.M)); // TODO
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


    set previousPositionObservable(value: Observable<Position2d>) {
        this.previousPositionObservableSource.next(value);
    }


    set speedObservable(value: Observable<Speed>) {
        this.speedObservableSource.next(value);
    }


    set nextMtObservable(value: Observable<Angle>) {
        this.nextMtObservableSource.next(value);
    }


    private calcVariation(position: Position2d): Angle {
        return new Angle(0, AngleUnit.DEG); // TODO
    }


    private calcLegTime(distance: Distance, speed: Speed): Time {
        if (!distance || !speed) {
            return undefined;
        }

        return new Time(distance.getValue(LengthUnit.NM) / speed.getValue(SpeedUnit.KT) * 60, TimeUnit.M);
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
