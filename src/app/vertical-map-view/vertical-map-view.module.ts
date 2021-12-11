import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VerticalMapModule} from '../vertical-map/vertical-map.module';
import {VerticalMapRestModule} from '../vertical-map-rest/vertical-map-rest.module';
import {VerticalMapButtonComponent} from './ng-components/vertical-map-button/vertical-map-button.component';
import {VerticalMapComponent} from './ng-components/vertical-map/vertical-map.component';
import {VerticalMapStateModule} from '../vertical-map-state/vertical-map-state.module';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';


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
        VerticalMapModule,
        VerticalMapRestModule,
        VerticalMapStateModule
    ],
    providers: [
    ]
})
export class VerticalMapViewModule {
}
