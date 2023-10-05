import {NgModule} from '@angular/core';
import {IWebcamService} from './service/i-webcam.service';
import {WebcamService} from './service/webcam.service';


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
export class WebcamDomainModule {}
