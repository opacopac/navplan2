import {NgModule} from '@angular/core';
import {IMeteoSmaService} from './domain-service/i-meteo-sma.service';
import {MeteoSmaService} from './domain-service/meteo-sma.service';


@NgModule({
    imports: [
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
