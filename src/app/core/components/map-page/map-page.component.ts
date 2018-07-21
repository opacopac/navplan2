import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {MapZoomInAction, MapZoomOutAction} from '../../../map/map.actions';
import {MapContext} from '../../../map/model/map-context';
import {MapOlComponentsContainerComponent} from '../map-ol-components-container/map-ol-components-container.component';
import {MapOverlayContainerComponent} from '../map-overlay-container/map-overlay-container.component';


@Component({
    selector: 'app-map-page',
    templateUrl: './map-page.component.html',
    styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
    @ViewChild(MapOlComponentsContainerComponent) mapOlComponentsContainer: MapOlComponentsContainerComponent;
    @ViewChild(MapOverlayContainerComponent) mapOverlayContainer: MapOverlayContainerComponent;


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }



    public onMapInitCompleted(mapContext: MapContext) {
        this.mapOlComponentsContainer.onMapInitCompleted(mapContext);
        this.mapOverlayContainer.onMapInitCompleted(mapContext);
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
}
