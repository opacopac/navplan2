import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {NavaidService} from './rest-service/navaid.service';
import {EffectsModule} from '@ngrx/effects';
import {NavaidEffects} from './ngrx/navaid-effects';


@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([NavaidEffects]),
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        NavaidService
    ]
})
export class NavaidModule {}
