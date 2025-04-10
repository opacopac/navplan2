import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SearchEffects} from './ngrx/search.effects';
import {searchReducer} from './ngrx/search.reducer';
import {SearchDomainModule} from '../domain/search-domain.module';
import {SearchRestModule} from '../rest/search-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('searchState', searchReducer),
        EffectsModule.forFeature([SearchEffects]),
        SearchDomainModule,
        SearchRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class SearchStateModule {
}
