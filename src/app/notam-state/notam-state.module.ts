import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {notamReducer} from './ngrx/notam.reducer';
import {NotamEffects} from './ngrx/notam.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('notamState', notamReducer),
        EffectsModule.forFeature([NotamEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class NotamStateModule {}
