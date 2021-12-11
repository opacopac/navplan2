import {NgModule} from '@angular/core';
import {WebcamModule} from '../webcam/webcam.module';
import {WebcamRestModule} from '../webcam-rest/webcam-rest.module';
import {WebcamStateModule} from '../webcam-state/webcam-state.module';


@NgModule({
    imports: [
        WebcamModule,
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
