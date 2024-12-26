import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {routeMeteoReducer} from './ngrx/route-meteo.reducer';
import {RouteMeteoEffects} from './ngrx/route-meteo.effects';
import {PlanMeteoDomainModule} from '../domain/plan-meteo-domain.module';


@NgModule({
    imports: [
        PlanMeteoDomainModule,
        StoreModule.forFeature('routeMeteoState', routeMeteoReducer),
        EffectsModule.forFeature([
            RouteMeteoEffects
        ]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class PlanMeteoStateModule {
}
