import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VerticalMapDomainModule} from '../domain/vertical-map-domain.module';
import {VerticalMapRestModule} from '../rest/vertical-map-rest.module';
import {VerticalMapButtonComponent} from './ng-components/vertical-map-button/vertical-map-button.component';
import {VerticalMapComponent} from './ng-components/vertical-map/vertical-map.component';
import {VerticalMapStateModule} from '../state/vertical-map-state.module';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';


@NgModule({
    declarations: [
        VerticalMapComponent,
        VerticalMapButtonComponent
    ],
    exports: [
        VerticalMapComponent,
        VerticalMapButtonComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        VerticalMapDomainModule,
        VerticalMapRestModule,
        VerticalMapStateModule
    ],
    providers: [
    ]
})
export class VerticalMapViewModule {
}
