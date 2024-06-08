import {Component, OnInit} from '@angular/core';
import {BaseMapActions} from '../../../state/ngrx/base-map.actions';
import {Store} from '@ngrx/store';


@Component({
    selector: 'app-zoom-buttons',
    templateUrl: './zoom-buttons.component.html',
    styleUrls: ['./zoom-buttons.component.scss']
})
export class ZoomButtonsComponent implements OnInit {
    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onZoomInClicked() {
        this.appStore.dispatch(BaseMapActions.zoomIn());
    }


    public onZoomOutClicked() {
        this.appStore.dispatch(BaseMapActions.zoomOut());
    }
}
