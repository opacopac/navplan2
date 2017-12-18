import { Injectable } from '@angular/core';
import { Sessioncontext, Globalsettings, Mapsettings } from '../model/sessioncontext';
import { Flightroute } from '../model/flightroute';
import { MapbaselayerType } from '../model/map/mapbaselayer-factory';
import { Position2d } from '../model/position';


@Injectable()
export class SessionService {
    private context: Sessioncontext;


    constructor() {
        this.initSessionContext();
    }


    initSessionContext() {
        this.context = new Sessioncontext();
        this.context.flightroute = new Flightroute();
        this.context.settings = new Globalsettings();
        this.context.settings.variationDeg = 2;
        this.context.settings.maxTrafficAltitudeFt = 15000;
        this.context.settings.baseMapType = MapbaselayerType.OPENTOPOMAP;
        this.context.map = new Mapsettings();
        this.context.map.zoom = 11;
        this.context.map.position = new Position2d(7.4971, 46.9141); // LSZB initially
    }


    getSessionContext() {
        return this.context;
    }


    isLoggedIn(): boolean {
        return (this.context.user != null && this.context.user.email != null && this.context.user.token != null);
    }



    isSelf(): boolean {
        return (this.context.user != null && this.context.user.email === 'armand@tschanz.com');
    }
}
