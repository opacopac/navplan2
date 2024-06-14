import {NgModule} from '@angular/core';
import {SettingsPageComponent} from './ng-components/settings-page/settings-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GeoPhysicsViewModule,
    ],
    declarations: [
        SettingsPageComponent,
    ],
    exports: [
        SettingsPageComponent
    ],
    providers: [
    ]
})
export class SettingsViewModule {
}
