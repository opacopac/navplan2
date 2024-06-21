import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {IconButtonComponent} from './icon-button/icon-button.component';
import {MatTooltip} from '@angular/material/tooltip';
import {TrashIconButtonComponent} from './trash-icon-button/trash-icon-button.component';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltip,
    ],
    declarations: [
        IconButtonComponent,
        TrashIconButtonComponent
    ],
    exports: [
        IconButtonComponent,
        TrashIconButtonComponent
    ],
    providers: []
})
export class CommonViewModule {
}
