import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {MapZoomInAction, MapZoomOutAction} from '../../../base-map/base-map.actions';
import {BaseMapContext} from '../../../base-map/model/base-map-context';
import {OlComponentsContainerComponent} from '../ol-components-container/ol-components-container.component';
import {OlOverlayContainerComponent} from '../ol-overlay-container/ol-overlay-container.component';


@Component({
    selector: 'app-planning-map-page',
    templateUrl: './planning-map-page.component.html',
    styleUrls: ['./planning-map-page.component.css']
})
export class PlanningMapPageComponent implements OnInit {
    @ViewChild(OlComponentsContainerComponent) mapOlComponentsContainer: OlComponentsContainerComponent;
    @ViewChild(OlOverlayContainerComponent) mapOverlayContainer: OlOverlayContainerComponent;


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }



    public onMapInitCompleted(mapContext: BaseMapContext) {
        this.mapOlComponentsContainer.onMapInitCompleted(mapContext);
        this.mapOverlayContainer.onMapInitCompleted(mapContext.mapService);
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
