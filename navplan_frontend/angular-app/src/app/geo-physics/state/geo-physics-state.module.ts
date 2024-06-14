import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {geoPhysicsReducer} from './ngrx/geo-physics.reducer';


@NgModule({
    imports: [
        StoreModule.forFeature('geoPhysicsState', geoPhysicsReducer),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class GeoPhysicsStateModule {
}
