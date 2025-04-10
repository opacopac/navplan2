import {NgModule} from '@angular/core';
import {AirspaceStateModule} from '../state/airspace-state.module';
import {AirspaceDomainModule} from '../domain/airspace-domain.module';


@NgModule({
    imports: [
        AirspaceDomainModule,
        AirspaceStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AirspaceViewModule {
}
