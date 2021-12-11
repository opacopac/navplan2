import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {IMeteoSmaService} from './domain-service/i-meteo-sma.service';
import {MeteoSmaService} from './domain-service/meteo-sma.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IMeteoSmaService, useClass: MeteoSmaService },
    ]
})
export class MeteoSmaModule {
}