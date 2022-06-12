import {NgModule} from '@angular/core';
import {WebcamDomainModule} from '../domain/webcam-domain.module';
import {WebcamRestModule} from '../rest/webcam-rest.module';
import {WebcamStateModule} from '../state/webcam-state.module';


@NgModule({
    imports: [
        WebcamDomainModule,
        WebcamRestModule,
        WebcamStateModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class WebcamViewModule {}
