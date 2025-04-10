import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {verticalMapReducer} from './ngrx/vertical-map.reducer';
import {VerticalMapEffects} from './ngrx/vertical-map.effects';
import {FlightrouteViewModule} from '../../flightroute/view/flightroute-view.module';


@NgModule({
    declarations: [],
    exports: [],
    imports: [
        StoreModule.forFeature('verticalMapState', verticalMapReducer),
        EffectsModule.forFeature([VerticalMapEffects]),
        FlightrouteViewModule,
    ],
    providers: []
})
export class VerticalMapStateModule {
}
