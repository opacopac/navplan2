import {NgModule} from '@angular/core';
import {LocationService} from './service/location.service';
import {ILocationService} from './service/i-location.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: ILocationService, useClass: LocationService }
    ]
})
export class LocationDomainModule {
}
