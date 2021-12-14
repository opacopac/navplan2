import {NgModule} from '@angular/core';
import {MetarTafModule} from '../metar-taf/metar-taf.module';
import {MetarTafRestModule} from '../metar-taf-rest/metar-taf-rest.module';
import {MetarTafStateModule} from '../metar-taf-state/metar-taf-state.module';
import {MetarTafComponent} from './ng-components/metar-taf/metar-taf.component';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        MetarTafModule,
        MetarTafRestModule,
        MetarTafStateModule,
        CommonModule,
    ],
    declarations: [
        MetarTafComponent
    ],
    exports: [
        MetarTafComponent
    ],
    providers: [
    ]
})
export class MetarTafViewModule {
}
