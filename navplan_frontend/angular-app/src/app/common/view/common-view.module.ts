import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {IconButtonComponent} from './icon-button/icon-button.component';
import {MatTooltip} from '@angular/material/tooltip';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltip,
    ],
    declarations: [
        IconButtonComponent,
    ],
    exports: [
        IconButtonComponent,
    ],
    providers: []
})
export class CommonViewModule {
}
