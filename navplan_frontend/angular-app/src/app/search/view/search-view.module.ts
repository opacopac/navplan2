import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchBoxComponent} from './ng-components/search-box/search-box.component';
import {SearchContainerComponent} from './ng-components/search-container/search-container.component';
import {SearchDomainModule} from '../domain/search-domain.module';
import {SearchRestModule} from '../rest/search-rest.module';
import {SearchStateModule} from '../state/search-state.module';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        SearchDomainModule,
        SearchRestModule,
        SearchStateModule,
        MatButtonModule,
    ],
    declarations: [
        SearchBoxComponent,
        SearchContainerComponent,
    ],
    exports: [
        SearchContainerComponent,
    ],
    providers: []
})
export class SearchViewModule {
}
