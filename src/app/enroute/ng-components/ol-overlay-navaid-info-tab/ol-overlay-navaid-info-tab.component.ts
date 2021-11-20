import {Component, Input, OnInit} from '@angular/core';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {Navaid} from '../../domain-model/navaid';
import {WmmHelper} from '../../../common/geo-math/domain-service/wmm-helper';
import {LengthUnit} from '../../../common/geo-math/domain-model/quantities/length-unit';


@Component({
    selector: 'app-ol-overlay-navaid-info-tab',
    templateUrl: './ol-overlay-navaid-info-tab.component.html',
    styleUrls: ['./ol-overlay-navaid-info-tab.component.css']
})
export class OlOverlayNavaidInfoTabComponent implements OnInit {
    @Input() public navaid: Navaid;


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.navaid.position);
    }


    public getVariationString(): string {
        const magVar = WmmHelper.calcMagneticVariation(this.navaid.position);
        return StringnumberHelper.getEWString(magVar, 1);
    }


    public getElevationString(): string {
        return StringnumberHelper.getLengthString(this.navaid.elevation, LengthUnit.FT); // TODO
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
