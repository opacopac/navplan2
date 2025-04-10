import {NgModule} from '@angular/core';
import {BaseMapStateModule} from '../state/base-map-state.module';
import {BaseMapDomainModule} from '../domain/base-map-domain.module';


@NgModule({
    imports: [
        BaseMapDomainModule,
        BaseMapStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class BaseMapViewModule {
}
