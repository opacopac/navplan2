import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FlightMapActions} from '../../../state/ngrx/flight-map.actions';
import {getShowMapLayerSelection} from '../../../state/ngrx/flight-map.selectors';


@Component({
    selector: 'app-map-layer-selection-button',
    templateUrl: './map-layer-selection-button.component.html',
    styleUrls: ['./map-layer-selection-button.component.scss']
})
export class MapLayerSelectionButtonComponent implements OnInit {
    public showMapLayerSelection$: Observable<boolean> = this.appStore.pipe(select(getShowMapLayerSelection));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onVerticalMapClicked() {
        this.appStore.dispatch(FlightMapActions.toggleMapLayerSelection());
    }


    public getStatusCLass(showMapLayerSelection: boolean): string {
        return showMapLayerSelection
            ? 'mapbutton-status-ok'
            : 'mapbutton-primary';
    }
}
