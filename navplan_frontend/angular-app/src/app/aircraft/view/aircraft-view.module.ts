import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTab, MatTabContent, MatTabGroup, MatTabLabel} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {CommonViewModule} from '../../common/view/common-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {AircraftPageComponent} from './ng-components/aircraft-page/aircraft-page.component';
import {
    AircraftListContainerComponent
} from './ng-components/aircraft-list-container/aircraft-list-container.component';
import {
    AircraftDetailsContainerComponent
} from './ng-components/aircraft-details-container/aircraft-details-container.component';
import {AircraftDomainModule} from '../domain/aircraft-domain.module';
import {AircraftRestModule} from '../rest/aircraft-rest.module';
import {AircraftStateModule} from '../state/aircraft-state.module';
import {AircraftListComponent} from './ng-components/aircraft-list/aircraft-list.component';
import {AircraftDetailsComponent} from './ng-components/aircraft-details/aircraft-details.component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        ReactiveFormsModule,
        AircraftDomainModule,
        AircraftRestModule,
        AircraftStateModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatCardModule,
        MatTab,
        MatTabGroup,
        MatTabLabel,
        MatTabContent,
        MatRadioButton,
        MatRadioGroup,
    ],
    declarations: [
        AircraftPageComponent,
        AircraftListContainerComponent,
        AircraftListComponent,
        AircraftDetailsContainerComponent,
        AircraftDetailsComponent
    ],
    exports: [],
    providers: []
})
export class AircraftViewModule {
}
