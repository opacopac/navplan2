import {NgModule} from '@angular/core';
import {AerodromeReportingStateModule} from '../state/aerodrome-reporting-state.module';
import {AerodromeReportingDomainModule} from '../domain/aerodrome-reporting-domain.module';


@NgModule({
    imports: [
        AerodromeReportingDomainModule,
        AerodromeReportingStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeReportingViewModule {
}
