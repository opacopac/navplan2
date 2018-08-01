import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IcaoCallsignService} from './services/icaocallsign.service';
import {TrafficReducerService} from './services/traffic-reducer.service';
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
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule, MatTooltipModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature<TrafficState, TrafficActions>('trafficState', trafficReducer),
        EffectsModule.forFeature([TrafficEffects]),
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatCardModule,
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
        TrafficReducerService,
        TrafficAdsbexchangeService,
        TrafficOgnService,
    ]
})
export class TrafficModule {}
