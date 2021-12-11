import {NgModule} from '@angular/core';
import {IWebcamRepoService} from '../webcam/domain-service/i-webcam-repo.service';
import {WebcamRestService} from './rest-service/webcam-rest.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IWebcamRepoService, useClass: WebcamRestService }
    ]
})
export class WebcamRestModule {}
