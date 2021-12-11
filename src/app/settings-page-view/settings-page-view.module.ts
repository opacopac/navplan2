import {NgModule} from '@angular/core';
import {SettingsPageComponent} from './ng-components/settings-page/settings-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
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
export class SettingsPageViewModule {
}
