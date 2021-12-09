import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {IMeteoSmaRepoService} from './domain-service/i-meteo-sma-repo.service';
import {RestMeteoSmaService} from './rest-service/rest-meteo-sma.service';
import {IMeteoSmaService} from './domain-service/i-meteo-sma.service';
import {MeteoSmaService} from './domain-service/meteo-sma.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IMeteoSmaService, useClass: MeteoSmaService },
        { provide: IMeteoSmaRepoService, useClass: RestMeteoSmaService },
    ]
})
export class MeteoSmaModule {
}
