import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {NavaidService} from './domain-service/navaid.service';
import {RestNavaidService} from './rest-service/rest-navaid.service';


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
        { provide: NavaidService, useClass: RestNavaidService },
    ]
})
export class NavaidModule {}
