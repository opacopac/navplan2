import { Component, OnInit} from '@angular/core';
import { StringnumberService } from '../../../services/utils/stringnumber.service';
import { UnitconversionService } from '../../../services/utils/unitconversion.service';
import { Navaid } from '../../../model/navaid';
import { MapOverlayContent } from '../map-overlay-content';
import { Position2d } from '../../../model/position';


@Component({
    selector: 'app-map-overlay-navaid',
    templateUrl: './map-overlay-navaid.component.html',
    styleUrls: ['./map-overlay-navaid.component.css']
})
export class MapOverlayNavaidComponent implements OnInit, MapOverlayContent {
    public navaid: Navaid;


    constructor() {
    }


    ngOnInit() {
    }


    public bindFeatureData(navaid: Navaid) {
        this.navaid = navaid;
    }


    public getTitle(): string {
        return 'Navigational Aid';
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.navaid.position;
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.navaid.position.getLonLat());
    }



    public getElevationString() {
        return Math.round(UnitconversionService.m2ft(this.navaid.elevation_m)) + 'ft';
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
