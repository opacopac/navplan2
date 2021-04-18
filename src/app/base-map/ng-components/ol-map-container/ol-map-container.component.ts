import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {OlBaseMapService} from '../../ol-service/ol-base-map.service';
import {Position2d} from '../../../geo-math/domain-model/geometry/position2d';
import {DataItem} from '../../../shared/model/data-item';
import {Extent2d} from '../../../geo-math/domain-model/geometry/extent2d';
import {BaseMapClickedAction, BaseMapMovedZoomedRotatedAction} from '../../ngrx/base-map.actions';
import {Angle} from '../../../geo-math/domain-model/quantities/angle';


@Component({
    selector: 'app-ol-map-container',
    templateUrl: './ol-map-container.component.html',
    styleUrls: ['./ol-map-container.component.css']
})
export class OlMapContainerComponent implements OnInit, OnDestroy {
    private mapMovedZoomedRotatedSubscription: Subscription;
    private mapClickedSubscription: Subscription;


    public constructor(
        private appStore: Store<any>,
        private mapService: OlBaseMapService) {
    }


    // region component life cycle

    public ngOnInit() {
        this.mapMovedZoomedRotatedSubscription = this.mapService.onMapMovedZoomedRotated.subscribe(event => {
            this.dispatchPosZoomRotAction(event.position, event.zoom, event.rotation, event.extent);
        });

        this.mapClickedSubscription = this.mapService.onMapClicked.subscribe(event => {
            this.dispatchMapClickedAction(event.clickPos, event.dataItem);
        });
    }


    public ngOnDestroy() {
        this.mapMovedZoomedRotatedSubscription.unsubscribe();
        this.mapClickedSubscription.unsubscribe();

        this.mapService.uninitMap();
    }

    // endregion


    // region events

    private dispatchPosZoomRotAction(position: Position2d, zoom: number, rotation: Angle, extent: Extent2d) {
        this.appStore.dispatch(
            new BaseMapMovedZoomedRotatedAction(
                position as Position2d,
                zoom as number,
                rotation as Angle,
                extent as Extent2d)
        );
    }


    private dispatchMapClickedAction(clickPos: Position2d, dataItem: DataItem) {
        this.appStore.dispatch(
            new BaseMapClickedAction(
                clickPos,
                dataItem
            )
        );
    }

    // endregion
}
