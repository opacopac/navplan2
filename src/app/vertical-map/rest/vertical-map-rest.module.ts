import {NgModule} from '@angular/core';
import {RestVerticalMapRepoService} from './service/rest-vertical-map-repo.service';
import {IVerticalMapRepoService} from '../domain/service/i-vertical-map-repo.service';


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
