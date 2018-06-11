import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


export class WaypointAltitude2 {
    private altSource: BehaviorSubject<number>;
    private isminaltSource: BehaviorSubject<boolean>;
    private ismaxaltSource: BehaviorSubject<boolean>;
    private isaltatlegstartSource: BehaviorSubject<boolean>;


    constructor(
        alt_ft?: number, // TODO: typed
        isminalt = false,
        ismaxalt = false,
        isaltatlegstart = false) {
        this.altSource = new BehaviorSubject<number>(alt_ft);
        this.isminaltSource = new BehaviorSubject<boolean>(isminalt);
        this.ismaxaltSource = new BehaviorSubject<boolean>(ismaxalt);
        this.isaltatlegstartSource = new BehaviorSubject<boolean>(isaltatlegstart);
    }


    get alt_ft$(): Observable<number> {
        return this.altSource.asObservable();
    }


    set alt_ft(value: number) {
        this.altSource.next(value);
    }


    get isminalt$(): Observable<boolean> {
        return this.isminaltSource.asObservable();
    }


    set isminalt(value: boolean) {
        this.isminaltSource.next(value);
    }


    get ismaxalt$(): Observable<boolean> {
        return this.ismaxaltSource.asObservable();
    }


    set ismaxalt(value: boolean) {
        this.ismaxaltSource.next(value);
    }


    get isaltatlegstart$(): Observable<boolean> {
        return this.isaltatlegstartSource.asObservable();
    }


    set isaltatlegstart(value: boolean) {
        this.isaltatlegstartSource.next(value);
    }
}
