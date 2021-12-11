import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchBoxComponent} from './ng-components/search-box/search-box.component';
import {SearchContainerComponent} from './ng-components/search-container/search-container.component';
import {OlOverlayAirspaceStructureComponent} from './ng-components/ol-overlay-airspace-structure/ol-overlay-airspace-structure.component';
import {OlOverlayAirspaceComponent} from './ng-components/ol-overlay-airspace/ol-overlay-airspace.component';
import {SearchModule} from '../search/search.module';
import {SearchRestModule} from '../search-rest/search-rest.module';
import {SearchStateModule} from '../search-state/search-state.module';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        SearchModule,
        SearchRestModule,
        SearchStateModule,
        MatButtonModule,
    ],
    declarations: [
        SearchBoxComponent,
        SearchContainerComponent,
        OlOverlayAirspaceStructureComponent,
        OlOverlayAirspaceComponent,
    ],
    exports: [
        SearchContainerComponent,
        OlOverlayAirspaceStructureComponent
    ],
    providers: [
    ]
})
export class SearchViewModule {}
