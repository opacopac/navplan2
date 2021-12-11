import {NgModule} from '@angular/core';
import {IWmmService} from './domain-service/wmm/i-wmm.service';
import {WmmService} from './domain-service/wmm/wmm.service';


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
export class GeoPhysicsModule {}
