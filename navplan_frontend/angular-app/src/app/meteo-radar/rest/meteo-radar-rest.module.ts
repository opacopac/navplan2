import {NgModule} from '@angular/core';
import {MeteoRadarDomainModule} from '../domain/meteo-radar-domain.module';
import {IMeteoRadarImageService} from '../domain/service/i-meteo-radar-image.service';
import {RestRadarImageService} from './service/rest-radar-image.service';


@NgModule({
    imports: [
        MeteoRadarDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IMeteoRadarImageService, useClass: RestRadarImageService},
    ]
})
export class MeteoRadarRestModule {
}
