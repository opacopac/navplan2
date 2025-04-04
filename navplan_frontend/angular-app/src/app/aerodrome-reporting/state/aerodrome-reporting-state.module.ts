import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reportingPointSectorReducer} from './ngrx/reporting-point-sector.reducer';
import {ReportingPointSectorEffects} from './ngrx/reporting-point-sector.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('reportingPointSectorState', reportingPointSectorReducer),
        EffectsModule.forFeature([
            ReportingPointSectorEffects
        ]),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeReportingStateModule {
}
