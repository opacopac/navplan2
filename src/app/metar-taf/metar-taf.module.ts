import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestMetarTafService} from './rest-service/rest-metar-taf.service';
import {SharedModule} from '../common/shared.module';
import {BaseMapModule} from '../base-map/base-map.module';
import {MetarTafService} from './domain-service/metar-taf.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BaseMapModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        MetarTafService,
        RestMetarTafService
    ]
})
export class MetarTafModule {
}
