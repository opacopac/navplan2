import {NgModule} from '@angular/core';
import {AerodromeChartsStateModule} from '../state/aerodrome-charts-state.module';
import {AerodromeChartsDomainModule} from '../domain/aerodrome-charts-domain.module';


@NgModule({
    imports: [
        AerodromeChartsDomainModule,
        AerodromeChartsStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeChartsViewModule {
}
