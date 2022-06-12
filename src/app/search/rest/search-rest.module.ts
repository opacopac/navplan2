import {NgModule} from '@angular/core';
import {ISearchRepoService} from '../domain/service/i-search-repo.service';
import {RestSearchService} from './service/rest-search.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: ISearchRepoService, useClass: RestSearchService }
    ]
})
export class SearchRestModule {}
