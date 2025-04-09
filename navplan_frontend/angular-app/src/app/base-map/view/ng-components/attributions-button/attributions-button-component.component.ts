import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getShowAttributions} from '../../../state/ngrx/base-map.selectors';
import {BaseMapActions} from '../../../state/ngrx/base-map.actions';
import {Observable} from 'rxjs';
import {CommonViewModule} from '../../../../common/view/common-view.module';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-attributions-button',
    standalone: true,
    imports: [
        CommonModule,
        CommonViewModule
    ],
    templateUrl: './attributions-button-component.component.html',
    styleUrls: ['./attributions-button-component.component.scss']
})
export class AttributionsButtonComponent implements OnInit {
    public showAttributions$: Observable<boolean> = this.appStore.pipe(select(getShowAttributions));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onButtonClicked() {
        this.appStore.dispatch(BaseMapActions.toggleAttributions());
    }
}
