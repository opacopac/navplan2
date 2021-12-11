import {NgModule} from '@angular/core';
import {WebcamModule} from '../webcam/webcam.module';
import {IWebcamRepo} from '../webcam/domain-service/i-webcam-repo';
import {WebcamRestService} from './rest-service/webcam-rest.service';


@NgModule({
    imports: [
        WebcamModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IWebcamRepo, useClass: WebcamRestService }
    ]
})
export class WebcamRestModule {}
