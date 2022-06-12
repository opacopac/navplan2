import {NgModule} from '@angular/core';
import {IWmmService} from './service/wmm/i-wmm.service';
import {WmmService} from './service/wmm/wmm.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IWmmService, useClass: WmmService }
    ]
})
export class GeoPhysicsDomainModule {}
