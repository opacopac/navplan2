import {Injectable} from '@angular/core';
import {Position4d} from '../../model/geometry/position4d';
import {Timestamp} from '../../model/quantities/timestamp';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Altitude} from '../../model/quantities/altitude';
import {LengthUnit} from '../utils/unitconversion.service';


export enum LocationServiceStatus {
    OFF,
    WAITING,
    CURRENT,
    ERROR,
}


const ERROR_NOT_SUPPORTED_MSG = 'ERROR: geolocation is not supported by browser!';
const POSITION_OPTIONS: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
};


@Injectable()
export class LocationService {
    public lastPositions: Position4d[] = []; // TODO
    private readonly positionSource: BehaviorSubject<Position4d>;
    private readonly statusSource: BehaviorSubject<LocationServiceStatus>;
    private readonly watchIdSource: BehaviorSubject<number>;


    constructor() {
        this.positionSource = new BehaviorSubject<Position4d>(undefined);
        this.statusSource = new BehaviorSubject<LocationServiceStatus>(LocationServiceStatus.OFF);
        this.watchIdSource = new BehaviorSubject<number>(undefined);
    }


    get position$(): Observable<Position4d> {
        return this.positionSource.asObservable();
    }


    get status$(): Observable<LocationServiceStatus> {
        return this.statusSource.asObservable();
    }


    get isWatching$(): Observable<boolean> {
        return this.watchIdSource.asObservable().map(watchId => watchId !== undefined);
    }


    public getSinglePosition(): Observable<Position4d> {
        return Observable.create(observer => {
            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    pos => {
                        observer.next(this.get4dPosition(pos));
                        observer.complete();
                    },
                    error => observer.error(this.getPositionError(error)),
                    POSITION_OPTIONS
                );
            } else {
                observer.error(ERROR_NOT_SUPPORTED_MSG);
            }
        });
    }


    public toggleWatching(): boolean {
        if (this.watchIdSource.getValue()) {
            this.stopWatching();
            return false;
        } else {
            this.startWatching();
            return true;
        }
    }


    private startWatching() {
        this.statusSource.next(LocationServiceStatus.WAITING);
        if (window.navigator.geolocation) {
            this.lastPositions = []; // TODO
            const watchId = window.navigator.geolocation.watchPosition(
                pos => {
                    this.statusSource.next(LocationServiceStatus.CURRENT);
                    const pos4d = this.get4dPosition(pos);
                    this.positionSource.next(pos4d);
                    this.lastPositions.push(pos4d); // TODO
                },
                error => {
                    this.statusSource.next(LocationServiceStatus.ERROR);
                    this.positionSource.error(this.getPositionError(error));
                },
                POSITION_OPTIONS);
            this.watchIdSource.next(watchId);
        } else {
            this.positionSource.error(ERROR_NOT_SUPPORTED_MSG);
            this.statusSource.next(LocationServiceStatus.ERROR);
        }
    }


    private stopWatching() {
        const watchId = this.watchIdSource.getValue();
        window.navigator.geolocation.clearWatch(watchId);
        this.watchIdSource.next(undefined);
        this.positionSource.next(undefined);
        this.statusSource.next(LocationServiceStatus.OFF);
    }


    private get4dPosition(position: Position): Position4d {
        return new Position4d(
            position.coords.longitude,
            position.coords.latitude,
            new Altitude(position.coords.altitude, LengthUnit.M),
            new Timestamp(position.timestamp));
    }


    private getPositionError(error: PositionError): string {
        return 'ERROR: no position, error code=' + error.code;
    }
}