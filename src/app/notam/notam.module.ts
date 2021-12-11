import {NgModule} from '@angular/core';
import {INotamService} from './domain-service/i-notam.service';
import {NotamService} from './domain-service/notam.service';


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
export class NotamModule {}
