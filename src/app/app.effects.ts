import {Injectable} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {filter} from 'rxjs/operators';
import {SelectActiveMapAction} from './app.actions';
import {ActiveMapType} from './app-state';


@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private appStore: Store<any>) {

        this.listenToRouter();
    }


    private listenToRouter() {
        this.router.events.pipe(
            filter(event => event instanceof ActivationEnd)
        )
            .subscribe((event: ActivationEnd) => {
                this.dispatchEvent(event.snapshot.routeConfig.path);
            });
    }


    private dispatchEvent(path: string) {
        switch (path) {
            case 'map':
                this.appStore.dispatch(new SelectActiveMapAction(ActiveMapType.NAV_MAP));
                break;
            case 'chartmap':
                this.appStore.dispatch(new SelectActiveMapAction(ActiveMapType.CHART_MAP));
                break;
            default:
                this.appStore.dispatch(new SelectActiveMapAction(ActiveMapType.NONE));
                break;
        }
    }
}
