import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


export class WaypointAltitude2 {
    public alt$: Observable<number>;
    private altSource: BehaviorSubject<number>;
    public isminalt$: Observable<boolean>;
    private isminaltSource: BehaviorSubject<boolean>;
    public ismaxalt$: Observable<boolean>;
    private ismaxaltSource: BehaviorSubject<boolean>;
    public isaltatlegstart$: Observable<boolean>;
    private isaltatlegstartSource: BehaviorSubject<boolean>;


    constructor(
        alt?: number,
        isminalt = false,
        ismaxalt = false,
        isaltatlegstart = false) {
        this.altSource = new BehaviorSubject<number>(alt);
        this.alt$ = this.altSource.asObservable();
        this.isminaltSource = new BehaviorSubject<boolean>(isminalt);
        this.isminalt$ = this.isminaltSource.asObservable();
        this.ismaxaltSource = new BehaviorSubject<boolean>(ismaxalt);
        this.ismaxalt$ = this.ismaxaltSource.asObservable();
        this.isaltatlegstartSource = new BehaviorSubject<boolean>(isaltatlegstart);
        this.isaltatlegstart$ = this.isaltatlegstartSource.asObservable();
    }


    set alt(value: number) {
        this.altSource.next(value);
    }


    set isminalt(value: boolean) {
        this.isminaltSource.next(value);
    }


    set ismaxalt(value: boolean) {
        this.ismaxaltSource.next(value);
    }


    set isaltatlegstart(value: boolean) {
        this.isaltatlegstartSource.next(value);
    }
}
