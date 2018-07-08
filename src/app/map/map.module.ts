import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MapService} from './services/map.service';
import {MapComponent} from './components/map/map.component';
import {MapContainerComponent} from './components/map-container/map-container.component';
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
        StoreModule.forFeature('mapState', mapReducer),
        EffectsModule.forFeature([MapEffects])
    ],
    declarations: [
        MapComponent,
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
