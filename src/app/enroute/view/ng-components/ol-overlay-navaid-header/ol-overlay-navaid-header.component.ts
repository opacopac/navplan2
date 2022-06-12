import {Component, Input, OnInit} from '@angular/core';
import {Navaid} from '../../../domain/model/navaid';
import {OlNavaidIcon} from '../../ol-components/navaid/ol-navaid-icon';


@Component({
    selector: 'app-ol-overlay-navaid-header',
    templateUrl: './ol-overlay-navaid-header.component.html',
    styleUrls: ['./ol-overlay-navaid-header.component.css']
})
export class OlOverlayNavaidHeaderComponent implements OnInit {
    @Input() public navaid: Navaid;


    ngOnInit() {
    }


    public getAvatarUrl(): string {
        return OlNavaidIcon.getUrl(this.navaid.type);
    }
}
