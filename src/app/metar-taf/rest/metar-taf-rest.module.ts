import {NgModule} from '@angular/core';
import {IMetarTafRepoService} from '../domain/service/i-metar-taf-repo.service';
import {RestMetarTafService} from './service/rest-metar-taf.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IMetarTafRepoService, useClass: RestMetarTafService },
    ]
})
export class MetarTafRestModule { }
