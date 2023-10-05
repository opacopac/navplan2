import {NgModule} from '@angular/core';
import {RestAirspaceService} from './service/rest-airspace.service';
import {RestNavaidService} from './service/rest-navaid.service';
import {IAirspaceRepo} from '../domain/service/i-airspace-repo';
import {INavaidRepo} from '../domain/service/i-navaid-repo';


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
