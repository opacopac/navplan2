import {Injectable} from '@angular/core';
import {Sessioncontext} from '../../model/session/sessioncontext';


@Injectable()
export class SessionService {
    private context: Sessioncontext;


    constructor() {
        this.context = new Sessioncontext(this.createSessionId());
    }


    public getSessionContext() {
        return this.context;
    }


    // TODO => context
    public isIdle(timeoutMs: number) {
        return false;
        // TODO: !$scope.globalData.showLocation && Date.now() > $scope.globalData.lastActivity + IDLE_TIMEOUT_MS
    }


    private createSessionId(): number {
        return Math.floor((Math.random() * 1000000000));
    }
}
