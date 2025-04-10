import {NgModule} from '@angular/core';
import {SearchService} from './service/search.service';
import {ISearchService} from './service/i-search.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: ISearchService, useClass: SearchService},
    ]
})
export class SearchDomainModule {
}
