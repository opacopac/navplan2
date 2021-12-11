import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VerticalMapModule} from '../vertical-map/vertical-map.module';
import {VerticalMapRestModule} from '../vertical-map-rest/vertical-map-rest.module';
import {VerticalMapButtonComponent} from './ng-components/vertical-map-button/vertical-map-button.component';
import {VerticalMapComponent} from './ng-components/vertical-map/vertical-map.component';
import {VerticalMapStateFlightMapModule} from '../vertical-map-state-flight-map/vertical-map-state-flight-map.module';
import {MatButtonModule} from '@angular/material/button';


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
        VerticalMapModule,
        VerticalMapRestModule,
        VerticalMapStateFlightMapModule
    ],
    providers: [
    ]
})
export class VerticalMapViewFlightMapModule {
}
