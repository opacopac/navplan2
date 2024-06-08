import {Component, Input, OnInit} from '@angular/core';
import {Navaid} from '../../../domain/model/navaid';
import {OlNavaidIcon} from '../../ol-components/navaid/ol-navaid-icon';


@Component({
    selector: 'app-map-popup-navaid-header',
    templateUrl: './map-popup-navaid-header.component.html',
    styleUrls: ['./map-popup-navaid-header.component.scss']
})
export class MapPopupNavaidHeaderComponent implements OnInit {
    @Input() public navaid: Navaid;


    ngOnInit() {
    }


    public getAvatarUrl(): string {
        return OlNavaidIcon.getUrl(this.navaid.type);
    }
}
