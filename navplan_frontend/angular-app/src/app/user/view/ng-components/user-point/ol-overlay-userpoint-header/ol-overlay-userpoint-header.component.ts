import {Component, Input, OnInit} from '@angular/core';
import {UserPoint} from '../../../../domain/model/user-point';
import {OlUserpointIcon} from '../../../ol-components/ol-userpoint-icon';


@Component({
    selector: 'app-ol-overlay-userpoint-header',
    templateUrl: './ol-overlay-userpoint-header.component.html',
    styleUrls: ['./ol-overlay-userpoint-header.component.css']
})
export class OlOverlayUserpointHeaderComponent implements OnInit {
    @Input() public userpoint: UserPoint;


    ngOnInit() {
    }


    public getAvatarUrl(): string {
        return OlUserpointIcon.getUrl();
    }
}
