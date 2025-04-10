import {NgModule} from '@angular/core';
import {NotamStateModule} from '../state/notam-state.module';
import {NotamDomainModule} from '../domain/notam-domain.module';


@NgModule({
    imports: [
        NotamDomainModule,
        NotamStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class NotamViewModule {
}
