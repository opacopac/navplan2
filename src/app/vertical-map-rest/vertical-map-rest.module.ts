import {NgModule} from '@angular/core';
import {RestVerticalMapRepoService} from './rest-service/rest-vertical-map-repo.service';
import {IVerticalMapRepoService} from '../vertical-map/domain-service/i-vertical-map-repo.service';


@NgModule({
    declarations: [
    ],
    exports: [
    ],
    imports: [
    ],
    providers: [
        { provide: IVerticalMapRepoService, useClass: RestVerticalMapRepoService }
    ]
})
export class VerticalMapRestModule {
}
