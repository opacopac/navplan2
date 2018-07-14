import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchService} from './services/search/search.service';
import {SearchBoxComponent} from './components/search-box/search-box.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {searchReducer} from './search.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SearchEffects} from './search.effects';
import {SearchState} from './model/search-state';
import {SearchActions} from './search.actions';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature<SearchState, SearchActions>('searchState', searchReducer),
        EffectsModule.forFeature([SearchEffects])
    ],
    declarations: [
        SearchBoxComponent
    ],
    exports: [
        SearchBoxComponent
    ],
    providers: [
        SearchService
    ]
})
export class SearchModule {}
