import {NgModule} from '@angular/core';
import {MeteoRadarDomainModule} from '../domain/meteo-radar-domain.module';
import {MeteoRadarStateModule} from '../state/meteo-radar-state.module';


@NgModule({
    imports: [
        MeteoRadarDomainModule,
        MeteoRadarStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoRadarViewModule {
}
