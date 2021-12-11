import {NgModule} from '@angular/core';
import {IMetarTafService} from './domain-service/i-metar-taf.service';
import {MetarTafService} from './domain-service/metar-taf.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IMetarTafService, useClass: MetarTafService },
    ]
})
export class MetarTafModule {
}
