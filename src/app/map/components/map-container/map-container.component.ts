import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MapZoomInAction, MapZoomOutAction} from '../../map.actions';


@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {
    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onZoomInClicked() {
        this.appStore.dispatch(
            new MapZoomInAction()
        );
    }


    public onZoomOutClicked() {
        this.appStore.dispatch(
            new MapZoomOutAction()
        );
    }


    public onOverlayClose() {
        // TODO
    }
}
