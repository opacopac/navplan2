import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {routeMeteoReducer} from './ngrx/route-meteo.reducer';
import {RouteMeteoEffects} from './ngrx/route-meteo.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('routeMeteoState', routeMeteoReducer),
        EffectsModule.forFeature([RouteMeteoEffects]),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class RouteMeteoStateModule {
}
