import {Component, OnInit} from '@angular/core';
import {VerticalMapActions} from '../../../state/ngrx/vertical-map.actions';
import {VerticalMapButtonStatus} from '../../../domain/model/vertical-map-button-status';
import {select, Store} from '@ngrx/store';
import {getVerticalMapState} from '../../../state/ngrx/vertical-map.selectors';
import {VerticalMapState} from '../../../state/state-model/vertical-map-state';


@Component({
    selector: 'app-vertical-map-button',
    templateUrl: './vertical-map-button.component.html',
    styleUrls: ['./vertical-map-button.component.css']
})
export class VerticalMapButtonComponent implements OnInit {
    public vmState$ = this.appStore.pipe(select(getVerticalMapState));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onVerticalMapClicked() {
        this.appStore.dispatch(VerticalMapActions.toggle());
    }


    public getStatusCLass(vmState: VerticalMapState): string {
        switch (vmState.buttonStatus) {
            case VerticalMapButtonStatus.CURRENT:
                return 'mapbutton-status-ok';
            case VerticalMapButtonStatus.WAITING:
                return 'mapbutton-status-warn';
            case VerticalMapButtonStatus.ERROR:
                return 'mapoverlay-status-readError';
            case VerticalMapButtonStatus.OFF:
            default:
                return 'mapbutton-primary';
        }
    }
}
