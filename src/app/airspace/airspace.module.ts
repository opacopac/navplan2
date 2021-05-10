import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {AirspaceService} from './rest-service/airspace.service';
import {AirspaceEffects} from './ngrx/airspace-effects';
import {EffectsModule} from '@ngrx/effects';


@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([AirspaceEffects]),
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        AirspaceService
    ]
})
export class AirspaceModule {}
