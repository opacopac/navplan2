import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {CommonViewModule} from '../../common/view/common-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {ExporterViewModule} from '../../exporter/view/exporter-view.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';
import {MatDialogModule} from '@angular/material/dialog';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import {PlanPerfContainerComponent} from './ng-components/plan-perf-container/plan-perf-container.component';
import {PlanPerfRunwayComponent} from './ng-components/plan-perf-runway/plan-perf-runway.component';
import {
    PlanPerfDepartureCalculationComponent
} from './ng-components/plan-perf-departure-calculation/plan-perf-departure-calculation.component';
import {
    PlanPerfCorrectionFactorsComponent
} from './ng-components/plan-perf-correction-factors/plan-perf-correction-factors.component';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        GeoPhysicsViewModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSelectModule,
        MatCardModule,
        ExporterViewModule,
        MatTabsModule,
        MetarTafViewModule,
        MatDialogModule,
        AircraftViewModule,
        MatSlideToggleModule,
        MatRadioButton,
        MatRadioGroup,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelDescription,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
    ],
    declarations: [
        PlanPerfContainerComponent,
        PlanPerfRunwayComponent,
        PlanPerfDepartureCalculationComponent,
        PlanPerfCorrectionFactorsComponent,
    ],
    exports: [
        PlanPerfContainerComponent,
    ],
    providers: []
})
export class PlanPerformanceViewModule {
}
