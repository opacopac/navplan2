import {NgModule} from '@angular/core';
import {AircraftDomainModule} from '../domain/aircraft-domain.module';
import {AircraftRestModule} from '../rest/aircraft-rest.module';
import {AircraftStateModule} from '../state/aircraft-state.module';
import {AircraftPerformanceViewModule} from '../../aircraft-performance/view/aircraft-performance-view.module';
import {AircraftWnbViewModule} from '../../aircraft-wnb/view/aircraft-wnb-view.module';


@NgModule({
    imports: [
        AircraftDomainModule,
        AircraftRestModule,
        AircraftStateModule,
        AircraftPerformanceViewModule,
        AircraftWnbViewModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AircraftViewModule {
}
