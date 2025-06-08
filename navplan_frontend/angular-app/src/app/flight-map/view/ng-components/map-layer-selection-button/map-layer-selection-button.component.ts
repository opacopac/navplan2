import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FlightMapActions} from '../../../state/ngrx/flight-map.actions';
import {getShowMapLayerSelection} from '../../../state/ngrx/flight-map.selectors';
import {StatusButtonComponent} from '../../../../common/view/ng-components/status-button/status-button.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-map-layer-selection-button',
    imports: [
        CommonModule,
        StatusButtonComponent
    ],
    templateUrl: './map-layer-selection-button.component.html',
    styleUrls: ['./map-layer-selection-button.component.scss']
})
export class MapLayerSelectionButtonComponent implements OnInit {
    public showMapLayerSelection$: Observable<boolean> = this.appStore.pipe(select(getShowMapLayerSelection));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onButtonClicked() {
        this.appStore.dispatch(FlightMapActions.toggleMapLayerSelection());
    }
}
