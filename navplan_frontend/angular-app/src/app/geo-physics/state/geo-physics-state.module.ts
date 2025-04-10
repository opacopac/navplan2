import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {geoPhysicsReducer} from './ngrx/geo-physics.reducer';
import {GeoPhysicsDomainModule} from '../domain/geo-physics-domain.module';


@NgModule({
    imports: [
        StoreModule.forFeature('geoPhysicsState', geoPhysicsReducer),
        GeoPhysicsDomainModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class GeoPhysicsStateModule {
}
