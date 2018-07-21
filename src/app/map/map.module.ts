import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MapService} from './services/map.service';
import {MapContainerComponent} from './components/map/map-container.component';
import {ZoomButtonsComponent} from './components/zoom-buttons/zoom-buttons.component';
import {SearchModule} from '../search/search.module';
import {LocationModule} from '../location/location.module';
import {TrafficModule} from '../traffic/traffic.module';
import {MapFeaturesModule} from '../map-features/map-features.module';
import {NotamModule} from '../notam/notam.module';
import {FlightrouteModule} from '../flightroute/flightroute.module';
import {MetarTafModule} from '../metar-taf/metar-taf.module';
import {StoreModule} from '@ngrx/store';
import {mapReducer} from './map.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MapEffects} from './map.effects';
import {MapActions} from './map.actions';
import {MapState} from './model/map-state';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SearchModule,
        LocationModule,
        TrafficModule,
        MapFeaturesModule,
        NotamModule,
        FlightrouteModule,
        MetarTafModule,
        StoreModule.forFeature<MapState, MapActions>('mapState', mapReducer),
        EffectsModule.forFeature([MapEffects]),
        MatButtonModule,
        MatTooltipModule,
    ],
    declarations: [
        MapContainerComponent,
        ZoomButtonsComponent,
    ],
    exports: [
        MapContainerComponent,
        ZoomButtonsComponent,
    ],
    providers: [
        MapService
    ]
})
export class MapModule {}
