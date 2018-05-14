import { Component, OnInit} from '@angular/core';
import { StringnumberService } from '../../../services/utils/stringnumber.service';
import { Navaid } from '../../../model/navaid';
import { Position2d } from '../../../model/position';
import { MapOverlayContainer } from '../map-overlay-container';


@Component({
    selector: 'app-map-overlay-navaid',
    templateUrl: './map-overlay-navaid.component.html',
    styleUrls: ['./map-overlay-navaid.component.css']
})
export class MapOverlayNavaidComponent extends MapOverlayContainer implements OnInit {
    public navaid: Navaid;
    private container: HTMLElement;


    ngOnInit() {
        this.container = document.getElementById('map-overlay-navaid-container');
    }


    public getContainerHtmlElement() {
        return this.container;
    }


    public bindFeatureData(navaid: Navaid) {
        this.navaid = navaid;
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.navaid.position;
    }


    public getMorseString() {
        if (!this.navaid.kuerzel) {
            return;
        }

        const dotHtml = ' <b>&middot;</b> ';
        const dashHtml = ' <b>&#8211;</b> ';
        const spacer = '&nbsp;&nbsp;&nbsp;';
        let out = '';

        for (let i = 0; i < this.navaid.kuerzel.length; i++) {
            const letter = this.navaid.kuerzel.substring(i, i + 1).toUpperCase();
            let code = StringnumberService.getMorseString(letter);
            code = code.replace(/\./g, dotHtml);
            code = code.replace(/\-/g, dashHtml);

            if (i > 0) {
                out += spacer;
            }

            out += letter + ' ' + code;
        }

        return out;
    }
}
