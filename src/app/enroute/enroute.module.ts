import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {RestAirspaceService} from './rest-service/rest-airspace.service';
import {RestNavaidService} from './rest-service/rest-navaid.service';
import {INavaidRepo} from './domain-service/i-navaid-repo';
import {IAirspaceRepo} from './domain-service/i-airspace-repo';


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
        { provide: IAirspaceRepo, useClass: RestAirspaceService },
        { provide: INavaidRepo, useClass: RestNavaidService },
    ]
})
export class EnrouteModule {}
