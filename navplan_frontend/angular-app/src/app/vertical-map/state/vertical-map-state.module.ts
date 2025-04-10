import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {verticalMapReducer} from './ngrx/vertical-map.reducer';
import {VerticalMapEffects} from './ngrx/vertical-map.effects';
import {FlightrouteStateModule} from '../../flightroute/state/flightroute-state.module';
import {VerticalMapDomainModule} from '../domain/vertical-map-domain.module';
import {VerticalMapRestModule} from '../rest/vertical-map-rest.module';


@NgModule({
    declarations: [],
    exports: [],
    imports: [
        StoreModule.forFeature('verticalMapState', verticalMapReducer),
        EffectsModule.forFeature([VerticalMapEffects]),
        VerticalMapDomainModule,
        VerticalMapRestModule,
        FlightrouteStateModule,
    ],
    providers: []
})
export class VerticalMapStateModule {
}
