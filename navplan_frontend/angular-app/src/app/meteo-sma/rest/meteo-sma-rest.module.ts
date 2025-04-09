import {NgModule} from '@angular/core';
import {IMeteoSmaRepoService} from '../domain/service/i-meteo-sma-repo.service';
import {RestMeteoSmaService} from './service/rest-meteo-sma.service';
import {MeteoSmaDomainModule} from '../domain/meteo-sma-domain.module';


@NgModule({
    imports: [
        MeteoSmaDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IMeteoSmaRepoService, useClass: RestMeteoSmaService},
    ]
})
export class MeteoSmaRestModule {
}
