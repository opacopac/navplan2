import {NgModule} from '@angular/core';
import {SearchDomainModule} from '../domain/search-domain.module';
import {SearchStateModule} from '../state/search-state.module';


@NgModule({
    imports: [
        SearchDomainModule,
        SearchStateModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class SearchViewModule {
}
