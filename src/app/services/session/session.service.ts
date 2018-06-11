import {Injectable} from '@angular/core';
import {Sessioncontext, Globalsettings, Mapsettings} from '../../model/sessioncontext';
import {MapbaselayerType} from '../../model/ol-model/mapbaselayer-factory';
import {Position2d} from '../../model/position';
import {AngleUnit, UnitconversionService} from '../utils/unitconversion.service';
import {Angle} from '../../model/units/angle';
import {Altitude} from '../../model/altitude';


@Injectable()
export class SessionService {
    private context: Sessioncontext;


    constructor() {
        this.initSessionContext();
    }


    initSessionContext() {
        this.context = new Sessioncontext();
        this.context.sessionId = this.createSessionId();
        this.context.selectedWaypoint = undefined;
        this.context.settings = new Globalsettings(
            new Angle(2, AngleUnit.DEG), // TODO => weg
            new Altitude(UnitconversionService.ft2m(15000)) // TODO => variable unit
        );
        this.context.map = new Mapsettings(
            MapbaselayerType.OPENTOPOMAP,
            new Position2d(7.4971, 46.9141), // LSZB initially
            11,
            new Angle(0, AngleUnit.RAD));
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
        // TODO: !$scope.globalData.showLocation && Date.now() > $scope.globalData.lastActivity + IDLE_TIMEOUT_MS
    }



    private createSessionId(): number {
        return Math.floor((Math.random() * 1000000000));
    }
}
