import {WaypointAltitude2} from './waypoint-altitude2';
import {Position2d} from '../position';
import {GeocalcService} from '../../services/utils/geocalc.service';
import {Waypointtype} from '../waypoint';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Time} from '../units/time';
import {Distance} from '../units/distance';
import {Speed} from '../units/speed';
import {Angle} from '../units/angle';
import {AngleUnit, LengthUnit, SpeedUnit, TimeUnit} from '../../services/utils/unitconversion.service';
import {RxService} from '../../services/utils/rx.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import {StringnumberService} from '../../services/utils/stringnumber.service';

const ADDITIONAL_VAC_TIME = new Time(5, TimeUnit.M);
const VAC_STRING = 'VAC';


export class Waypoint2 {
    private readonly typeSource: BehaviorSubject<Waypointtype>;
    private readonly freqSource: BehaviorSubject<string>;
    private readonly callsignSource: BehaviorSubject<string>;
    private readonly checkpointSource: BehaviorSubject<string>;
    private readonly remarkSource: BehaviorSubject<string>;
    private readonly supp_infoSource: BehaviorSubject<string>;
    private readonly positionSource: BehaviorSubject<Position2d>;
    private readonly isAlternateSource: BehaviorSubject<boolean>;
    public readonly alt: WaypointAltitude2;
    private readonly speedObservableSource: BehaviorSubject<Observable<Speed>>;
    private readonly previousWaypointSource: BehaviorSubject<Waypoint2>;
    private readonly nextWaypointSource: BehaviorSubject<Waypoint2>;


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
        this.freqSource = new BehaviorSubject<string>(freq);
        this.callsignSource = new BehaviorSubject<string>(callsign);
        this.checkpointSource = new BehaviorSubject<string>(checkpoint);
        this.remarkSource = new BehaviorSubject<string>(remark);
        this.supp_infoSource = new BehaviorSubject<string>(supp_info);
        this.positionSource = new BehaviorSubject<Position2d>(position);
        this.isAlternateSource = new BehaviorSubject<boolean>(false);
        this.alt = alt;
        this.speedObservableSource = new BehaviorSubject<Observable<Speed>>(undefined);
        this.previousWaypointSource = new BehaviorSubject<Waypoint2>(undefined);
        this.nextWaypointSource = new BehaviorSubject<Waypoint2>(undefined);
    }


    get type$(): Observable<Waypointtype> {
        return this.typeSource.asObservable();
    }


    set type(value: Waypointtype) {
        this.typeSource.next(value);
    }


    get freq$(): Observable<string> {
        return this.freqSource.asObservable();
    }


    set freq(value: string) {
        this.freqSource.next(value);
    }


    get callsign$(): Observable<string> {
        return this.callsignSource.asObservable();
    }


    set callsign(value: string) {
        this.callsignSource.next(value);
    }


    get checkpoint$(): Observable<string> {
        return this.checkpointSource.asObservable();
    }


    set checkpoint(value: string) {
        this.checkpointSource.next(value);
    }


    get remark$(): Observable<string> {
        return this.remarkSource.asObservable();
    }


    set remark(value: string) {
        this.remarkSource.next(value);
    }


    get supp_info$(): Observable<string> {
        return this.supp_infoSource.asObservable();
    }


    set supp_info(value: string) {
        this.supp_infoSource.next(value);
    }


    get position$(): Observable<Position2d> {
        return this.positionSource.asObservable();
    }


    set position(value: Position2d) {
        this.positionSource.next(value);
    }


    get previousPosition$(): Observable<Position2d> {
        return this.previousWaypoint$
            .flatMap(prevWp => prevWp ? prevWp.position$ : RxService.getEternal<Position2d>());
    }

    get isAlternate$(): Observable<boolean> {
        return this.isAlternateSource.asObservable();
    }


    set isAlternate(value: boolean) {
        this.isAlternateSource.next(value);
    }


    get previousWaypoint$(): Observable<Waypoint2> {
        return this.previousWaypointSource.asObservable();
    }


    set previousWaypoint(value: Waypoint2) {
        this.previousWaypointSource.next(value);
    }


    get nextWaypoint$(): Observable<Waypoint2> {
        return this.nextWaypointSource.asObservable();
    }


    set nextWaypoint(value: Waypoint2) {
        this.nextWaypointSource.next(value);
    }


    get speed$(): Observable<Speed> {
        return this.speedObservable$.flatMap(speedObs => speedObs ? speedObs : RxService.getEternal<Speed>());
    }


    get speedObservable$(): Observable<Observable<Speed>> {
        return this.speedObservableSource.asObservable();
    }


    set speedObservable(value: Observable<Speed>) {
        this.speedObservableSource.next(value);
    }


    get mt$(): Observable<Angle> {
        return Observable.combineLatest(
            this.previousPosition$,
            this.position$,
            this.variation$,
            (pos1, pos2, magVar) => {
                return GeocalcService.getBearing(pos1, pos2, magVar);
            }
        );
    }


    get mtText$(): Observable<string> {
        return Observable.combineLatest(
            this.mt$,
            this.vacTime$,
            this.isAlternate$)
            .map(([mt, vacTime, isAlternate]) => this.getMtText(mt, vacTime, isAlternate));
    }


    get nextMt$(): Observable<Angle> {
        return this.nextWaypoint$
            .flatMap(nextWp => nextWp ? nextWp.mt$ : RxService.getEternal<Angle>());
    }


    get variation$(): Observable<Angle> {
        return this.position$.map((pos) => this.calcVariation(pos));
    }


    get dist$(): Observable<Distance> {
        return Observable.combineLatest(
            this.previousPosition$,
            this.position$,
            (pos1, pos2) => {
                return GeocalcService.getDistance(pos1, pos2);
            }
        );
    }


    get distText$(): Observable<string> {
        return this.dist$
            .map(dist => this.getDistText(dist));
    }


    get legTime$(): Observable<Time> {
        return Observable.combineLatest(
            this.dist$,
            this.speed$,
            (distance, speed) => {
                return this.calcLegTime(distance, speed);
            }
        );
    }


    get vacTime$(): Observable<Time> {
        // TODO
        return Observable.combineLatest(
            this.type$,
            this.isAlternate$)
            .map(([type, isAlternate]) => this.calcVacTime(type, isAlternate));
    }


    get eetText$(): Observable<string> {
        return Observable.combineLatest(
            this.dist$,
            this.speed$,
            this.vacTime$)
            .map(([dist, speed, vacTime]) => this.getEetText(dist, speed, vacTime));
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


    private calcVacTime(type: Waypointtype, isAlternate: boolean): Time {
        if (isAlternate) {
            return ADDITIONAL_VAC_TIME;
        }

        /*if ((i === 1 && this.currentRoute.waypoints[0].type === Waypointtype.airport)
            || (i === this.currentRoute.waypoints.length - 1 && this.currentRoute.waypoints[i].type === Waypointtype.airport)) {
            this.currentRoute.waypoints[i].vacTime = ADDITIONAL_VAC_TIME_MIN;
        */
    }


    private getMtText(mt: Angle, vacTime: Time, isAlternate: boolean): string {
        if (!mt || !vacTime) {
            return '';
        } else if (vacTime.min > 0 && !isAlternate) {
            return VAC_STRING;
        } else {
            return StringnumberService.zeroPad(mt.deg, 3);
        }
    }


    private getDistText(dist: Distance): string {
        if (!dist) {
            return '';
        } else {
            return '' + Math.ceil(dist.getValue(LengthUnit.NM));
        }
    }


    private getEetText(dist: Distance, speed: Speed, vacTime: Time): string {
        if (!dist || dist.getValue(LengthUnit.NM) <= 0 || !speed || speed.getValue(SpeedUnit.KT) <= 0 || !vacTime) {
            return '';
        }

        const eet = '' + Math.ceil(dist.getValue(LengthUnit.NM) / speed.getValue(SpeedUnit.KT) * 60); // TODO

        if (vacTime.min > 0) {
            return eet + '/+' + vacTime.min;
        } else {
            return eet;
        }
    }
}
