import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SearchEffects} from './ngrx/search.effects';
import {searchReducer} from './ngrx/search.reducer';


@NgModule({
    imports: [
        StoreModule.forFeature('searchState', searchReducer),
        EffectsModule.forFeature([SearchEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class SearchStateModule {}
