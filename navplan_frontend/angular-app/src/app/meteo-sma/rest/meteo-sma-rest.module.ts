import {NgModule} from '@angular/core';
import {IMeteoSmaRepoService} from '../domain/service/i-meteo-sma-repo.service';
import {RestMeteoSmaService} from './service/rest-meteo-sma.service';


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
