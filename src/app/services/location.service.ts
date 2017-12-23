import { Injectable } from '@angular/core';
import { Position4d } from '../model/position';
import { Timestamp } from '../model/timestamp';


export enum LocationServiceStatus {
    off,
    waiting,
    current,
    error,
}


@Injectable()
export class LocationService {
    public isActivated = false;
    public status = LocationServiceStatus.off;
    public lastPositions: Position4d[] = [];
    private geoLocationWatchId: number;
    private successCallback: (position: Position4d) => void;
    private errorCallback: (message: string) => void;


    constructor() {
    }


    public startWatching(successCallback: (position: Position4d) => void, errorCallback: (message: string) => void) {
        if (!window.navigator.geolocation) {
            const message = 'ERROR: geolocation is not supported by browser!';
            console.error(message);

            if (errorCallback) {
                errorCallback(message);
            }

            return;
        }

        const options: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };

        this.geoLocationWatchId = window.navigator.geolocation.watchPosition(
            this.onPositionUpdate.bind(this),
            this.onPositionError.bind(this),
            options);

        this.isActivated = true;
        this.status = LocationServiceStatus.waiting;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
    }


    public stopWatching() {
        this.isActivated = false;
        this.status = LocationServiceStatus.off;
        window.navigator.geolocation.clearWatch(this.geoLocationWatchId);
        this.successCallback = undefined;
        this.errorCallback = undefined;
    }


    private onPositionUpdate(position) {
        this.status = LocationServiceStatus.current;
        const pos = new Position4d(
            position.coords.longitude,
            position.coords.latitude,
            position.coords.altitude,
            new Timestamp(position.timestamp));

        // add latest pos
        this.lastPositions.push(pos);

        if (this.successCallback) {
            this.successCallback(pos);
        }
    }


    private onPositionError(error) {
        this.status = LocationServiceStatus.error;

        const message = 'ERROR: no position, error code=' + error.code;
        console.log(message);

        if (this.errorCallback) {
            this.errorCallback(message);
        }
    }
}
