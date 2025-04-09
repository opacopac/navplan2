import {NgModule} from '@angular/core';
import {IMeteoSmaService} from './service/i-meteo-sma.service';
import {MeteoSmaService} from './service/meteo-sma.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IMeteoSmaService, useClass: MeteoSmaService},
    ]
})
export class MeteoSmaDomainModule {
}
