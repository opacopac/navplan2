import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {RestAirspaceService} from './rest-service/rest-airspace.service';
import {RestNavaidService} from './rest-service/rest-navaid.service';
import {INavaidRepo} from './domain-service/i-navaid-repo';
import {IAirspaceRepo} from './domain-service/i-airspace-repo';
import {StoreModule} from '@ngrx/store';
import {navaidReducer} from './ngrx/navaid/navaid.reducer';
import {airspaceReducer} from './ngrx/airspace/airspace.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NavaidEffects} from './ngrx/navaid/navaid.effects';
import {AirspaceEffects} from './ngrx/airspace/airspace.effects';
import {OlOverlayNavaidHeaderComponent} from './ng-components/ol-overlay-navaid-header/ol-overlay-navaid-header.component';
import {OlOverlayNavaidInfoTabComponent} from './ng-components/ol-overlay-navaid-info-tab/ol-overlay-navaid-info-tab.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('navaidState', navaidReducer),
        StoreModule.forFeature('airspaceState', airspaceReducer),
        EffectsModule.forFeature([NavaidEffects, AirspaceEffects]),
    ],
    declarations: [
        OlOverlayNavaidHeaderComponent,
        OlOverlayNavaidInfoTabComponent
    ],
    exports: [
        OlOverlayNavaidHeaderComponent,
        OlOverlayNavaidInfoTabComponent
    ],
    providers: [
        { provide: IAirspaceRepo, useClass: RestAirspaceService },
        { provide: INavaidRepo, useClass: RestNavaidService },
    ]
})
export class EnrouteModule {}
