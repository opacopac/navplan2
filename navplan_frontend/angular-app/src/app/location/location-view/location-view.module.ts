import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {LocationDomainModule} from '../location-domain/location-domain.module';
import {LocationStateModule} from '../location-state/location-state.module';
import {LocationButtonComponent} from './ng-components/location-button/location-button.component';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        LocationDomainModule,
        LocationStateModule
    ],
    declarations: [
        LocationButtonComponent,
    ],
    exports: [
        LocationButtonComponent,
    ],
    providers: [
    ]
})
export class LocationViewModule {
}
