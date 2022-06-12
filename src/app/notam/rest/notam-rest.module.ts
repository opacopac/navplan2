import {NgModule} from '@angular/core';
import {INotamRepoService} from '../domain/service/i-notam-repo.service';
import {RestNotamRepo} from './service/rest-notam-repo.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: INotamRepoService, useClass: RestNotamRepo },
    ]
})
export class NotamRestModule {}
