import {NgModule} from '@angular/core';
import {RestMeteoDwdService} from './rest-service/rest-meteo-dwd.service';
import {IMeteoDwdService} from '../meteo-dwd/domain-service/i-meteo-dwd.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IMeteoDwdService, useClass: RestMeteoDwdService },
    ]
})
export class MeteoDwdRestModule { }
