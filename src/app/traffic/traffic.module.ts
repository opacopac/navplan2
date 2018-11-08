import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IcaoCallsignService} from './services/icaocallsign.service';
import {TrafficReducerService} from './services/traffic-reducer.service';
import {TrafficAdsbexchangeService} from './services/traffic-adsbexchange.service';
import {TrafficOgnService} from './services/traffic-ogn.service';
import {OlOverlayTrafficComponent} from './components/ol-overlay-traffic/ol-overlay-traffic.component';
import {TrafficButtonComponent} from './components/traffic-button/traffic-button.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {trafficReducer} from './traffic.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TrafficEffects} from './traffic.effects';
import {TrafficState} from './traffic-state';
import {TrafficActions} from './traffic.actions';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule, MatTooltipModule} from '@angular/material';
import {BaseMapModule} from '../base-map/base-map.module';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<TrafficState, TrafficActions>('trafficState', trafficReducer),
        EffectsModule.forFeature([TrafficEffects]),
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatCardModule,
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
        TrafficReducerService,
        TrafficAdsbexchangeService,
        TrafficOgnService,
    ]
})
export class TrafficModule {}
