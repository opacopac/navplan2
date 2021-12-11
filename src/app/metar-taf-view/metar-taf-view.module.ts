import {NgModule} from '@angular/core';
import {MetarTafModule} from '../metar-taf/metar-taf.module';
import {MetarTafRestModule} from '../metar-taf-rest/metar-taf-rest.module';
import {MetarTafStateModule} from '../metar-taf-state/metar-taf-state.module';


@NgModule({
    imports: [
        MetarTafModule,
        MetarTafRestModule,
        MetarTafStateModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class MetarTafViewModule {
}
