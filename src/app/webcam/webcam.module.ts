import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {WebcamRestService} from './rest-service/webcam-rest.service';
import {IWebcamRepo} from './domain-service/i-webcam-repo';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IWebcamRepo, useClass: WebcamRestService }
    ]
})
export class WebcamModule {}
