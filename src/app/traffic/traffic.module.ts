import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IcaoCallsignService} from './services/icaocallsign.service';
import {TrafficService} from './services/traffic.service';
import {TrafficAdsbexchangeService} from './services/traffic-adsbexchange.service';
import {TrafficOgnService} from './services/traffic-ogn.service';
import {MapOverlayTrafficComponent} from './components/map-overlay-traffic/map-overlay-traffic.component';
import {TrafficButtonComponent} from './components/traffic-button/traffic-button.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {trafficReducer} from './traffic.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TrafficEffects} from './traffic.effects';
import {TrafficState} from './model/traffic-state';
import {TrafficActions} from './traffic.actions';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature<TrafficState, TrafficActions>('trafficState', trafficReducer),
        EffectsModule.forFeature([TrafficEffects]),
    ],
    declarations: [
        MapOverlayTrafficComponent,
        TrafficButtonComponent
    ],
    exports: [
        MapOverlayTrafficComponent,
        TrafficButtonComponent
    ],
    providers: [
        IcaoCallsignService,
        TrafficService,
        TrafficAdsbexchangeService,
        TrafficOgnService
    ]
})
export class TrafficModule {}
