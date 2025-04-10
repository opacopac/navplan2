import {NgModule} from '@angular/core';
import {LocationStateModule} from '../location-state/location-state.module';
import {LocationDomainModule} from '../location-domain/location-domain.module';


@NgModule({
    imports: [
        LocationDomainModule,
        LocationStateModule
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class LocationViewModule {
}
