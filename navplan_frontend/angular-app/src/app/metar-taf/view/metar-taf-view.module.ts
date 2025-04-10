import {NgModule} from '@angular/core';
import {MetarTafStateModule} from '../state/metar-taf-state.module';
import {MetarTafDomainModule} from '../domain/metar-taf-domain.module';


@NgModule({
    imports: [
        MetarTafDomainModule,
        MetarTafStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MetarTafViewModule {
}
