import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';
import {AircraftListActions} from '../../../state/ngrx/aircraft-list.actions';


@Component({
    selector: 'app-aircraft-picker-container',
    templateUrl: './aircraft-picker-container.component.html',
    styleUrls: ['./aircraft-picker-container.component.scss']
})
export class AircraftPickerContainerComponent implements OnInit {
    @Input() public labelText: string;
    @Input() public showRegistration: boolean;

    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));

    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected onSearchAircraftClicked() {
        this.appStore.dispatch(AircraftListActions.pickAircraft());
    }
}
