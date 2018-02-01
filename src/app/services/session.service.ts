import { Injectable } from '@angular/core';
import { Sessioncontext, Globalsettings, Mapsettings } from '../model/sessioncontext';
import { Flightroute } from '../model/flightroute';
import { MapbaselayerType } from '../model/ol-model/mapbaselayer-factory';
import { Position2d } from '../model/position';


@Injectable()
export class SessionService {
    private context: Sessioncontext;


    constructor() {
        this.initSessionContext();
    }


    initSessionContext() {
        this.context = new Sessioncontext();
        this.context.sessionId = this.createSessionId();
        this.context.flightroute = new Flightroute();
        this.context.settings = new Globalsettings();
        this.context.settings.variationDeg = 2;
        this.context.settings.maxTrafficAltitudeFt = 15000;
        this.context.settings.baseMapType = MapbaselayerType.OPENTOPOMAP;
        this.context.map = new Mapsettings();
        this.context.map.zoom = 11;
        this.context.map.position = new Position2d(7.4971, 46.9141); // LSZB initially
    }


    public getSessionContext() {
        return this.context;
    }


    public isLoggedIn(): boolean {
        return (this.context.user != null && this.context.user.email != null && this.context.user.token != null);
    }


    public isSelf(): boolean {
        return (this.context.user != null && this.context.user.email === 'armand@tschanz.com');
    }


    public isIdle(timeoutMs: number) {
        return false;
        //TODO: !$scope.globalData.showLocation && Date.now() > $scope.globalData.lastActivity + IDLE_TIMEOUT_MS
    }



    private createSessionId(): number {
        return Math.floor((Math.random() * 1000000000));
    }
}
