import {NgModule} from '@angular/core';
import {SettingsPageComponent} from './ng-components/settings-page/settings-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UnitSettingsComponent} from '../../geo-physics/view/ng-components/unit-settings/unit-settings.component';
import {GeoPhysicsStateModule} from '../../geo-physics/state/geo-physics-state.module';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GeoPhysicsStateModule,
        GeoPhysicsViewModule,
        UnitSettingsComponent,
    ],
    declarations: [
        SettingsPageComponent,
    ],
    exports: [
        SettingsPageComponent
    ],
    providers: []
})
export class SettingsViewModule {
}
