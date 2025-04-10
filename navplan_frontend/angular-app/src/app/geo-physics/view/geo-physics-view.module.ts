import {NgModule} from '@angular/core';
import {GeoPhysicsDomainModule} from '../domain/geo-physics-domain.module';
import {GeoPhysicsStateModule} from '../state/geo-physics-state.module';


@NgModule({
    imports: [
        GeoPhysicsDomainModule,
        GeoPhysicsStateModule,
    ],
    declarations: [],
    exports: [],
})
export class GeoPhysicsViewModule {
}
