import {NgModule} from '@angular/core';
import {WebcamModule} from '../webcam/webcam.module';
import {WebcamRestModule} from '../webcam-rest/webcam-rest.module';
import {WebcamStateFlightMapModule} from '../webcam-state-flight-map/webcam-state-flight-map.module';


@NgModule({
    imports: [
        WebcamModule,
        WebcamRestModule,
        WebcamStateFlightMapModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class WebcamViewFlightMapModule {}
