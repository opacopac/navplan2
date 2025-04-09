import {NgModule} from '@angular/core';
import {RestMeteoDwdService} from './service/rest-meteo-dwd.service';
import {IMeteoDwdService} from '../domain/service/i-meteo-dwd.service';
import {MeteoDwdDomainModule} from '../domain/meteo-dwd-domain.module';


@NgModule({
    imports: [
        MeteoDwdDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IMeteoDwdService, useClass: RestMeteoDwdService},
    ]
})
export class MeteoDwdRestModule {
}
