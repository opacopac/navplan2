import {NgModule} from '@angular/core';
import {IMeteoSmaRepoService} from '../meteo-sma/domain-service/i-meteo-sma-repo.service';
import {RestMeteoSmaService} from './rest-service/rest-meteo-sma.service';


@NgModule({
    imports: [
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
