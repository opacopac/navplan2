import {NgModule} from '@angular/core';
import {MeteoGramStateModule} from '../state/meteo-gram-state.module';
import {MeteoGramDomainModule} from '../domain/meteo-gram-domain.module';


@NgModule({
    imports: [
        MeteoGramDomainModule,
        MeteoGramStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoGramViewModule {
}
