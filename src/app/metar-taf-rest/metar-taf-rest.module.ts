import {NgModule} from '@angular/core';
import {IMetarTafRepoService} from '../metar-taf/domain-service/i-metar-taf-repo.service';
import {RestMetarTafService} from './rest-service/rest-metar-taf.service';


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
