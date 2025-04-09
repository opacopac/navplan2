import {NgModule} from '@angular/core';
import {IMetarTafService} from './service/i-metar-taf.service';
import {MetarTafService} from './service/metar-taf.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IMetarTafService, useClass: MetarTafService},
    ]
})
export class MetarTafDomainModule {
}
