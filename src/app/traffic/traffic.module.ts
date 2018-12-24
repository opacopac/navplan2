import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {IcaoCallsignService} from './services/icaocallsign.service';
import {TrafficMerger} from './traffic-merger/traffic-merger';
import {TrafficAdsbexchangeService} from './services/traffic-adsbexchange.service';
import {TrafficOgnService} from './services/traffic-ogn.service';
import {OlOverlayTrafficComponent} from './components/ol-overlay-traffic/ol-overlay-traffic.component';
import {TrafficButtonComponent} from './components/traffic-button/traffic-button.component';
import {SharedModule} from '../shared/shared.module';
import {trafficReducer} from './traffic.reducer';
import {TrafficEffects} from './traffic.effects';
import {TrafficState} from './traffic-state';
import {TrafficActions} from './traffic.actions';
import {BaseMapModule} from '../base-map/base-map.module';
import {TrafficTimerService} from './services/traffic-timer.service';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<TrafficState, TrafficActions>('trafficState', trafficReducer),
        EffectsModule.forFeature([TrafficEffects]),
        SharedModule,
        BaseMapModule,
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
        IcaoCallsignService,
        TrafficMerger,
        TrafficAdsbexchangeService,
        TrafficOgnService,
        TrafficTimerService
    ]
})
export class TrafficModule {}
