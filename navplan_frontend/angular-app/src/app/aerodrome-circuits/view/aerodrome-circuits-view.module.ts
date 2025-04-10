import {NgModule} from '@angular/core';
import {AerodromeCircuitsStateModule} from '../state/aerodrome-circuits-state.module';
import {AerodromeCircuitsDomainModule} from '../domain/aerodrome-circuits-domain.module';


@NgModule({
    imports: [
        AerodromeCircuitsDomainModule,
        AerodromeCircuitsStateModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeCircuitsViewModule {
}
