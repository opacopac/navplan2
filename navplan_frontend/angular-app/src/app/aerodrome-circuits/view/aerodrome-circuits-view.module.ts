import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {AerodromeCircuitsDomainModule} from '../domain/aerodrome-circuits-domain.module';
import {AerodromeCircuitsRestModule} from '../rest/aerodrome-circuits-rest.module';
import {AerodromeCircuitsStateModule} from '../state/aerodrome-circuits-state.module';


@NgModule({
    imports: [
        CommonModule,
        AerodromeCircuitsDomainModule,
        AerodromeCircuitsRestModule,
        AerodromeCircuitsStateModule,
        GeoPhysicsDomainModule,
        GeoPhysicsViewModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeCircuitsViewModule {
}
