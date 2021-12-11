import {NgModule} from '@angular/core';
import {LocationService} from './domain-service/location.service';
import {ILocationService} from './domain-service/i-location.service';


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
export class LocationModule {
}
