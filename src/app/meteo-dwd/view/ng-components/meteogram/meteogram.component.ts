import {Component, Input, OnInit} from '@angular/core';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {Store} from '@ngrx/store';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';


@Component({
    selector: 'app-meteogram',
    templateUrl: './meteogram.component.html',
    styleUrls: ['./meteogram.component.css']
})
export class MeteogramComponent implements OnInit {
    @Input() set position(pos: Position2d) {
        if (pos) {
            this.appStore.dispatch(MeteoDwdActions.readCloudMeteogram({position: pos}));
        }
    }

    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
    }
}
