import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LocationDomainModule} from '../location-domain/location-domain.module';
import {LocationStateModule} from '../location-state/location-state.module';
import {LocationButtonComponent} from './ng-components/location-button/location-button.component';
import {BaseMapViewModule} from '../../base-map/view/base-map-view.module';
import {CommonViewModule} from '../../common/view/common-view.module';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        LocationDomainModule,
        LocationStateModule,
        BaseMapViewModule,
        CommonViewModule
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
