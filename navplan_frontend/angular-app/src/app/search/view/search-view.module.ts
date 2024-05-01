import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchBoxComponent} from './ng-components/search-box/search-box.component';
import {SearchContainerComponent} from './ng-components/search-container/search-container.component';
import {
    OlOverlayAirspaceStructureComponent
} from './ng-components/ol-overlay-airspace-structure/ol-overlay-airspace-structure.component';
import {OlOverlayAirspaceComponent} from './ng-components/ol-overlay-airspace/ol-overlay-airspace.component';
import {SearchDomainModule} from '../domain/search-domain.module';
import {SearchRestModule} from '../rest/search-rest.module';
import {SearchStateModule} from '../state/search-state.module';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


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
