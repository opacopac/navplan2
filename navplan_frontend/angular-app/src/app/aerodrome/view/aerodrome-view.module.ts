import {NgModule} from '@angular/core';
import {AerodromeStateModule} from '../state/aerodrome-state.module';
import {AerodromeDomainModule} from '../domain/aerodrome-domain.module';


@NgModule({
    imports: [
        AerodromeDomainModule,
        AerodromeStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeViewModule {
}
