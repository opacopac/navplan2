import {NgModule} from '@angular/core';
import {NavaidStateModule} from '../state/navaid-state.module';
import {NavaidDomainModule} from '../domain/navaid-domain.module';


@NgModule({
    imports: [
        NavaidDomainModule,
        NavaidStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class NavaidViewModule {
}
