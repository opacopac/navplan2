import {Component, Input, OnInit} from '@angular/core';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Navaid} from '../../../domain/model/navaid';


@Component({
    selector: 'app-map-popup-navaid-info-tab',
    templateUrl: './map-popup-navaid-info-tab.component.html',
    styleUrls: ['./map-popup-navaid-info-tab.component.scss']
})
export class MapPopupNavaidInfoTabComponent implements OnInit {
    @Input() public navaid: Navaid;


    public constructor() {
    }


    ngOnInit() {
    }


    public getMorseString(): string {
        if (!this.navaid.kuerzel) {
            return;
        }

        const dotHtml = ' <b>&middot;</b> ';
        const dashHtml = ' <b>&#8211;</b> ';
        const spacer = '&nbsp;&nbsp;&nbsp;';
        let out = '';

        for (let i = 0; i < this.navaid.kuerzel.length; i++) {
            const letter = this.navaid.kuerzel.substring(i, i + 1).toUpperCase();
            let code = StringnumberHelper.getMorseString(letter);
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
