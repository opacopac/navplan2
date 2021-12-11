import {NgModule} from '@angular/core';
import {RestAirspaceService} from './rest-service/rest-airspace.service';
import {RestNavaidService} from './rest-service/rest-navaid.service';
import {IAirspaceRepo} from '../enroute/domain-service/i-airspace-repo';
import {INavaidRepo} from '../enroute/domain-service/i-navaid-repo';


@NgModule({
    imports: [
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
export class EnrouteRestModule {}
