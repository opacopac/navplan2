import {NgModule} from '@angular/core';
import {SettingsPageComponent} from './ng-components/settings-page/settings-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UnitSettingsComponent} from '../../geo-physics/view/ng-components/unit-settings/unit-settings.component';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
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
