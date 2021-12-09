import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestMetarTafService} from './rest-service/rest-metar-taf.service';
import {SharedModule} from '../common/shared.module';
import {IMetarTafRepo} from './domain-service/i-metar-taf-repo.service';


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
        { provide: IMetarTafRepo, useClass: RestMetarTafService },
    ]
})
export class MetarTafModule {
}
