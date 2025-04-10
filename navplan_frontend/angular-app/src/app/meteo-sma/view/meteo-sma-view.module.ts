import {NgModule} from '@angular/core';
import {MeteoSmaStateModule} from '../state/meteo-sma-state.module';
import {MeteoSmaDomainModule} from '../domain/meteo-sma-domain.module';


@NgModule({
    imports: [
        MeteoSmaDomainModule,
        MeteoSmaStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoSmaViewModule {
}
