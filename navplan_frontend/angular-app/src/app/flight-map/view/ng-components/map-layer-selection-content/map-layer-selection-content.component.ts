import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getSelectedMapBaseLayerType} from '../../../../base-map/state/ngrx/base-map.selectors';
import {MapBaseLayerType} from '../../../../base-map/domain/model/map-base-layer-type';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import {BaseMapActions} from '../../../../base-map/state/ngrx/base-map.actions';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-map-layer-selection-content',
    standalone: true,
    imports: [
        CommonModule,
        MatRadioModule,
        MatCheckboxModule,
    ],
    templateUrl: './map-layer-selection-content.component.html',
    styleUrls: ['./map-layer-selection-content.component.scss']
})
export class MapLayerSelectionContentComponent implements OnInit {
    public readonly baseMapType$: Observable<MapBaseLayerType> = this.appStore.pipe(select(getSelectedMapBaseLayerType));
    protected readonly MapBaseLayerType = MapBaseLayerType;
    protected readonly mapLayerTypesAndDescriptions = [
        [MapBaseLayerType.OPENTOPOMAP, 'OpenTopoMap (default)'],
        [MapBaseLayerType.SWISSTOPO_IMAGE, 'Aerial Images (swisstopo)'],
        [MapBaseLayerType.SWISSTOPO_ICAO, 'Aeronautical Chart ICAO Switzerland (swisstopo)'],
        [MapBaseLayerType.SWISSTOPO_GLIDER, 'Glider Chart Switzerland (swisstopo)']
    ];


    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
    }


    public onMapBgSelected(change: MatRadioChange) {
        const mapLayerType = parseInt(change.value, 10);
        this.appStore.dispatch(BaseMapActions.baseLayerSelected({mapBaseLayerType: mapLayerType}));
    }
}
