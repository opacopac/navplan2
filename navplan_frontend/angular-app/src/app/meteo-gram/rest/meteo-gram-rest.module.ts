import {NgModule} from '@angular/core';
import {IMeteoGramService} from '../domain/service/i-meteo-gram.service';
import {RestMeteoGramService} from './service/rest-meteo-gram.service';
import {MeteoGramDomainModule} from '../domain/meteo-gram-domain.module';


@NgModule({
    imports: [
        MeteoGramDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IMeteoGramService, useClass: RestMeteoGramService},
    ]
})
export class MeteoGramRestModule {
}
