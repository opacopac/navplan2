import {Component, Input, OnInit} from '@angular/core';
import {UserPoint} from '../../../../domain/model/user-point';
import {IWmmService} from '../../../../../geo-physics/domain/service/wmm/i-wmm.service';


@Component({
    selector: 'app-map-popup-userpoint-info-tab',
    templateUrl: './map-popup-userpoint-info-tab.component.html',
    styleUrls: ['./map-popup-userpoint-info-tab.component.scss']
})
export class MapPopupUserpointInfoTabComponent implements OnInit {
    @Input() public userpoint: UserPoint;


    public constructor(private wmmService: IWmmService) {
    }


    ngOnInit() {
    }
}
