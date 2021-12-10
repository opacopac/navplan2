import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {BaseMapModule} from '../base-map/base-map.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BaseMapModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class FlightMapTrackModule {
}
