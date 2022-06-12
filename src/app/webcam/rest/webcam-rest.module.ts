import {NgModule} from '@angular/core';
import {IWebcamRepoService} from '../domain/service/i-webcam-repo.service';
import {WebcamRestService} from './service/webcam-rest.service';


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
