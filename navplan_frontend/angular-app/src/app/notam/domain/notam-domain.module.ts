import {NgModule} from '@angular/core';
import {INotamService} from './service/i-notam.service';
import {NotamService} from './service/notam.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: INotamService, useClass: NotamService }
    ]
})
export class NotamDomainModule {}
