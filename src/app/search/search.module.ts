import {NgModule} from '@angular/core';
import {SearchService} from './domain-service/search.service';
import {ISearchService} from './domain-service/i-search.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: ISearchService, useClass: SearchService },
    ]
})
export class SearchModule {}
