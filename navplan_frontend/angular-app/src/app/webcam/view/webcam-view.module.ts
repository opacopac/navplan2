import {NgModule} from '@angular/core';
import {WebcamDomainModule} from '../domain/webcam-domain.module';
import {WebcamStateModule} from '../state/webcam-state.module';


@NgModule({
    imports: [
        WebcamDomainModule,
        WebcamStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class WebcamViewModule {
}
