import {NgModule} from '@angular/core';
import {AdsbexTrafficService} from './service/adsbex-traffic.service';
import {IAdsbexTrafficService} from '../domain/service/i-adsbex-traffic-service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAdsbexTrafficService, useClass: AdsbexTrafficService},
    ]
})
export class TrafficAdsbexRestModule {
}
