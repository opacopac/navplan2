import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AdsbexTrafficEffects} from './ngrx/adsbex-traffic.effects';


@NgModule({
    imports: [
        EffectsModule.forFeature([AdsbexTrafficEffects]),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficAdsbexStateModule {
}
