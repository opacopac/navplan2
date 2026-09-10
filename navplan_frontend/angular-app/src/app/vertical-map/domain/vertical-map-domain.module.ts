import {NgModule} from '@angular/core';
import {IVerticalMapService} from './service/i-vertical-map.service';
import {VerticalMapService} from './service/vertical-map.service';
import {IVerticalRouteService} from "./service/i-vertical-route.service";
import {VerticalRouteService} from "./service/vertical-route.service";


@NgModule({
    declarations: [],
    exports: [],
    imports: [],
    providers: [
        {provide: IVerticalMapService, useClass: VerticalMapService},
        {provide: IVerticalRouteService, useClass: VerticalRouteService}
    ]
})
export class VerticalMapDomainModule {
}
