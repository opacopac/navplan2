import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getSelectedMapBaseLayerType} from '../../../state/ngrx/base-map.selectors';
import {MapBaseLayerType} from '../../../domain/model/map-base-layer-type';
import {MatRadioChange} from '@angular/material/radio';
import {BaseMapActions} from '../../../state/ngrx/base-map.actions';


@Component({
    selector: 'app-layer-selection',
    templateUrl: './layer-selection.component.html',
    styleUrls: ['./layer-selection.component.css']
})
export class LayerSelectionComponent implements OnInit {
    public readonly baseMapType$: Observable<MapBaseLayerType> = this.appStore.pipe(select(getSelectedMapBaseLayerType));
    public readonly MapBaseLayerType: MapBaseLayerType;


    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
    }


    public onLayerSelected(change: MatRadioChange) {
        const layerName: string = change.value;
        const layer: MapBaseLayerType = MapBaseLayerType[layerName];
        this.appStore.dispatch(BaseMapActions.baseLayerSelected({ mapBaseLayerType: layer }));
    }
}
