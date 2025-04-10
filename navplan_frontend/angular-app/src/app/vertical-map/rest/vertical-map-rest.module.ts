import {NgModule} from '@angular/core';
import {RestVerticalMapRepoService} from './service/rest-vertical-map-repo.service';
import {IVerticalMapRepoService} from '../domain/service/i-vertical-map-repo.service';
import {VerticalMapDomainModule} from '../domain/vertical-map-domain.module';


@NgModule({
    declarations: [],
    exports: [],
    imports: [
        VerticalMapDomainModule
    ],
    providers: [
        {provide: IVerticalMapRepoService, useClass: RestVerticalMapRepoService}
    ]
})
export class VerticalMapRestModule {
}
