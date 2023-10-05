import {NgModule} from '@angular/core';
import {MetarTafDomainModule} from '../domain/metar-taf-domain.module';
import {MetarTafRestModule} from '../rest/metar-taf-rest.module';
import {MetarTafStateModule} from '../state/metar-taf-state.module';
import {MetarTafComponent} from './ng-components/metar-taf/metar-taf.component';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        MetarTafDomainModule,
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
