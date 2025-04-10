import {NgModule} from '@angular/core';
import {MeteoDwdStateModule} from '../state/meteo-dwd-state.module';
import {MeteoDwdDomainModule} from '../domain/meteo-dwd-domain.module';


@NgModule({
    imports: [
        MeteoDwdDomainModule,
        MeteoDwdStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoDwdViewModule {
}
