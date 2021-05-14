import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchService} from './rest-service/search.service';
import {SearchBoxComponent} from './ng-components/search-box/search-box.component';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {searchReducer} from './ngrx/search.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SearchEffects} from './ngrx/search.effects';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchContainerComponent} from './ng-components/search-container/search-container.component';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('searchState', searchReducer),
        EffectsModule.forFeature([SearchEffects]),
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        SharedModule,
    ],
    declarations: [
        SearchBoxComponent,
        SearchContainerComponent
    ],
    exports: [
        SearchContainerComponent
    ],
    providers: [
        SearchService
    ]
})
export class SearchModule {}
