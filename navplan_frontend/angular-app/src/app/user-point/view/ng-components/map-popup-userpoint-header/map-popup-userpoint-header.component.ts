import {Component, Input, OnInit} from '@angular/core';
import {UserPoint} from '../../../domain/model/user-point';
import {OlUserpointIcon} from '../../ol-components/ol-userpoint-icon';
import {MatCardModule} from '@angular/material/card';


@Component({
    selector: 'app-map-popup-userpoint-header',
    standalone: true,
    imports: [
        MatCardModule
    ],
    templateUrl: './map-popup-userpoint-header.component.html',
    styleUrls: ['./map-popup-userpoint-header.component.scss']
})
export class MapPopupUserpointHeaderComponent implements OnInit {
    @Input() public userpoint: UserPoint;


    ngOnInit() {
    }


    public getAvatarUrl(): string {
        return OlUserpointIcon.getUrl();
    }
}
