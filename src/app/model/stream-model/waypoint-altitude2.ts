import * as Rx from 'rxjs';


export class WaypointAltitude2 {
    public alt$: Rx.Observable<number>;
    private altSource: Rx.BehaviorSubject<number>;
    public isminalt$: Rx.Observable<boolean>;
    private isminaltSource: Rx.BehaviorSubject<boolean>;
    public ismaxalt$: Rx.Observable<boolean>;
    private ismaxaltSource: Rx.BehaviorSubject<boolean>;
    public isaltatlegstart$: Rx.Observable<boolean>;
    private isaltatlegstartSource: Rx.BehaviorSubject<boolean>;


    constructor(
        alt?: number,
        isminalt = false,
        ismaxalt = false,
        isaltatlegstart = false) {
        this.altSource = new Rx.BehaviorSubject<number>(alt);
        this.alt$ = this.altSource.asObservable();
        this.isminaltSource = new Rx.BehaviorSubject<boolean>(isminalt);
        this.isminalt$ = this.isminaltSource.asObservable();
        this.ismaxaltSource = new Rx.BehaviorSubject<boolean>(ismaxalt);
        this.ismaxalt$ = this.ismaxaltSource.asObservable();
        this.isaltatlegstartSource = new Rx.BehaviorSubject<boolean>(isaltatlegstart);
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
