import {NgModule} from '@angular/core';
import {IMetarTafRepoService} from '../domain/service/i-metar-taf-repo.service';
import {RestMetarTafService} from './service/rest-metar-taf.service';
import {MetarTafDomainModule} from '../domain/metar-taf-domain.module';


@NgModule({
    imports: [
        MetarTafDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IMetarTafRepoService, useClass: RestMetarTafService},
    ]
})
export class MetarTafRestModule {
}
