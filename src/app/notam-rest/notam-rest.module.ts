import {NgModule} from '@angular/core';
import {INotamRepoService} from '../notam/domain-service/i-notam-repo.service';
import {RestNotamRepo} from './rest-service/rest-notam-repo.service';


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
