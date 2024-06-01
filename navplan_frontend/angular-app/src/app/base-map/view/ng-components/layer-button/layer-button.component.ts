import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getShowBaseMapSelection} from '../../../state/ngrx/base-map.selectors';
import {BaseMapActions} from '../../../state/ngrx/base-map.actions';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-layer-button',
    templateUrl: './layer-button.component.html',
    styleUrls: ['./layer-button.component.scss']
})
export class LayerButtonComponent implements OnInit {
    public showBaseMapSelection$: Observable<boolean> = this.appStore.pipe(select(getShowBaseMapSelection));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onVerticalMapClicked() {
        this.appStore.dispatch(BaseMapActions.toggleMapBaseLayerSelection());
    }


    public getStatusCLass(showBaseMapSelection: boolean): string {
        return showBaseMapSelection
            ? 'mapbutton-status-ok'
            : 'mapbutton-primary';
    }
}
