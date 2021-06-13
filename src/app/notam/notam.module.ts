import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestNotamRepo} from './rest-service/rest-notam-repo.service';
import {SharedModule} from '../common/shared.module';
import {INotamRepo} from './domain-service/i-notam-repo';


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
        { provide: INotamRepo, useClass: RestNotamRepo },
    ]
})
export class NotamModule {}
