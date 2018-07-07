import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetarTafService} from './services/metar-taf.service';
import {MapOverlayButtonMetarTafComponent} from './components/map-overlay-button-metar-taf/map-overlay-button-metar-taf.component';
import {MapOverlayMetarTafComponent} from './components/map-overlay-metar-taf/map-overlay-metar-taf.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        MapOverlayButtonMetarTafComponent,
        MapOverlayMetarTafComponent
    ],
    exports: [
        MapOverlayButtonMetarTafComponent,
        MapOverlayMetarTafComponent
    ],
    providers: [
        MetarTafService
    ]
})
export class MetarTafModule {
}
