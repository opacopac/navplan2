import {NgModule} from '@angular/core';
import {IWebcamService} from './domain-service/i-webcam-service';
import {WebcamService} from './domain-service/webcam.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IWebcamService, useClass: WebcamService }
    ]
})
export class WebcamModule {}
