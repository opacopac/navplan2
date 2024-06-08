import {Component, Input, OnInit} from '@angular/core';
import {UserPoint} from '../../../../domain/model/user-point';
import {IWmmService} from '../../../../../geo-physics/domain/service/wmm/i-wmm.service';


@Component({
    selector: 'app-ol-overlay-userpoint-info-tab',
    templateUrl: './ol-overlay-userpoint-info-tab.component.html',
    styleUrls: ['./ol-overlay-userpoint-info-tab.component.scss']
})
export class OlOverlayUserpointInfoTabComponent implements OnInit {
    @Input() public userpoint: UserPoint;


    public constructor(private wmmService: IWmmService) {
    }


    ngOnInit() {
    }
}
