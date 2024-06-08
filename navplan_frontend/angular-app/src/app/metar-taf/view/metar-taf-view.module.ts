import {NgModule} from '@angular/core';
import {MetarTafDomainModule} from '../domain/metar-taf-domain.module';
import {MetarTafRestModule} from '../rest/metar-taf-rest.module';
import {MetarTafStateModule} from '../state/metar-taf-state.module';
import {MapPopupMetarTafComponent} from './ng-components/map-popup-metar-taf/map-popup-metar-taf.component';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        MetarTafDomainModule,
        MetarTafRestModule,
        MetarTafStateModule,
        CommonModule,
    ],
    declarations: [
        MapPopupMetarTafComponent
    ],
    exports: [
        MapPopupMetarTafComponent
    ],
    providers: [
    ]
})
export class MetarTafViewModule {
}
