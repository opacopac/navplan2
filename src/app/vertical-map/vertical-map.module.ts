import {NgModule} from '@angular/core';
import {IVerticalMapService} from './domain-service/i-vertical-map.service';
import {VerticalMapService} from './domain-service/vertical-map.service';


@NgModule({
    declarations: [
    ],
    exports: [
    ],
    imports: [
    ],
    providers: [
        { provide: IVerticalMapService, useClass: VerticalMapService },
    ]
})
export class VerticalMapModule {
}
