import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TrafficOgnService} from './rest/ogn/traffic-ogn.service';
import {OlOverlayTrafficComponent} from './ol/ol-overlay-traffic/ol-overlay-traffic.component';
import {TrafficButtonComponent} from './components/traffic-button/traffic-button.component';
import {SharedModule} from '../shared/shared.module';
import {trafficReducer} from './ngrx/traffic.reducer';
import {TrafficEffects} from './ngrx/traffic.effects';
import {TrafficState} from './domain/traffic-state';
import {TrafficActions} from './ngrx/traffic.actions';
import {OlMapModule} from '../ol-map/ol-map.module';
import {TrafficTimerService} from './use-case/traffic-timer.service';
import {TrafficDetailsService} from './rest/traffic-details/traffic-details.service';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<TrafficState, TrafficActions>('trafficState', trafficReducer),
        EffectsModule.forFeature([TrafficEffects]),
        SharedModule,
        OlMapModule,
    ],
    declarations: [
        OlOverlayTrafficComponent,
        TrafficButtonComponent
    ],
    exports: [
        OlOverlayTrafficComponent,
        TrafficButtonComponent
    ],
    providers: [
        TrafficOgnService,
        TrafficDetailsService,
        TrafficTimerService
    ]
})
export class TrafficModule {}
