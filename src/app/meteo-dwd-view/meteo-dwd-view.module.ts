import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MeteoDwdModule} from '../meteo-dwd/meteo-dwd.module';
import {MeteoDwdButtonComponent} from './ng-components/meteo-dwd-button/meteo-dwd-button.component';
import {MeteoDwdContainerComponent} from './ng-components/meteo-dwd-container/meteo-dwd-container.component';
import {MeteoDwdStateModule} from '../meteo-dwd-state/meteo-dwd-state.module';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MeteoDwdModule,
        MeteoDwdStateModule,
    ],
    declarations: [
        MeteoDwdButtonComponent,
        MeteoDwdContainerComponent
    ],
    exports: [
        MeteoDwdButtonComponent,
        MeteoDwdContainerComponent
    ],
    providers: [
    ]
})
export class MeteoDwdViewModule {
}
