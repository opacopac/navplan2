import {NgModule} from '@angular/core';
import {VerticalMapDomainModule} from '../domain/vertical-map-domain.module';
import {VerticalMapStateModule} from '../state/vertical-map-state.module';


@NgModule({
    imports: [
        VerticalMapDomainModule,
        VerticalMapStateModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class VerticalMapViewModule {
}
