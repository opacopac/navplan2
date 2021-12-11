import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {IMeteoSmaRepoService} from '../meteo-sma/domain-service/i-meteo-sma-repo.service';
import {RestMeteoSmaService} from './rest-service/rest-meteo-sma.service';


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
        { provide: IMeteoSmaRepoService, useClass: RestMeteoSmaService },
    ]
})
export class MeteoSmaRestModule {
}
