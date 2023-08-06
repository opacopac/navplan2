import {NgModule} from '@angular/core';
import {IMeteoGramService} from '../domain/service/i-meteo-gram.service';
import {RestMeteoGramService} from './service/rest-meteo-gram.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IMeteoGramService, useClass: RestMeteoGramService },
    ]
})
export class MeteoGramRestModule { }
