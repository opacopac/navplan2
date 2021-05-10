import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {NavaidService} from './rest-service/navaid.service';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NavaidState} from './ngrx/navaid-state';
import {NavaidActions} from './ngrx/navaid-actions';
import {navaidReducer} from './ngrx/navaid-reducer';
import {NavaidEffects} from './ngrx/navaid-effects';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<NavaidState, NavaidActions>('navaidState', navaidReducer),
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
