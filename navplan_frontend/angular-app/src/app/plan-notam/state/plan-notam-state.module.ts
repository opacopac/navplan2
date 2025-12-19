import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {routeNotamReducer} from './ngrx/route-notam.reducer';
import {RouteNotamEffects} from './ngrx/route-notam.effects';
import {PlanNotamDomainModule} from '../domain/plan-notam-domain.module';
import {PlanNotamRestModule} from '../rest/plan-notam-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('routeNotamState', routeNotamReducer),
        EffectsModule.forFeature([RouteNotamEffects]),
        PlanNotamDomainModule,
        PlanNotamRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class PlanNotamStateModule {
}
