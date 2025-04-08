import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reportingPointSectorReducer} from './ngrx/reporting-point-sector.reducer';
import {ReportingPointSectorEffects} from './ngrx/reporting-point-sector.effects';
import {AerodromeReportingDomainModule} from '../domain/aerodrome-reporting-domain.module';
import {AerodromeReportingRestModule} from '../rest/aerodrome-reporting-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('reportingPointSectorState', reportingPointSectorReducer),
        EffectsModule.forFeature([ReportingPointSectorEffects]),
        AerodromeReportingDomainModule,
        AerodromeReportingRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeReportingStateModule {
}
