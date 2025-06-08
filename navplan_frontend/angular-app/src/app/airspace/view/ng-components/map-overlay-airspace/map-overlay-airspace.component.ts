import {Component, Input, OnInit} from '@angular/core';
import {Airspace} from '../../../domain/model/airspace';
import {AltitudeReference} from '../../../../geo-physics/domain/model/geometry/altitude-reference';


@Component({
    selector: 'app-map-overlay-airspace',
    imports: [],
    templateUrl: './map-overlay-airspace.component.html',
    styleUrls: ['./map-overlay-airspace.component.scss']
})
export class MapOverlayAirspaceComponent implements OnInit {
    @Input() airspace: Airspace;
    @Input() isSimplified: boolean;
    @Input() showToggle: boolean;


    ngOnInit() {
    }


    public getBoxClass(): string {
        switch (this.airspace.category) {
            case 'A':
            case 'DANGER':
            case 'RESTRICTED':
            case 'PROHIBITED':
                return 'airspace-overlay-red';
            case 'FIR':
            case 'UIR':
            case 'GLIDING':
            case 'WAVE':
            case 'SPORT':
                return 'airspace-overlay-green';
            default:
                return 'airspace-overlay-blue';
        }
    }


    public getAirspaceCategoryText(): string {
        switch (this.airspace.category) {
            case 'CTR':
                return 'CTR';
            case 'DANGER':
                return 'Dng';
            case 'RESTRICTED':
                return 'R';
            case 'PROHIBITED':
                return 'P';
            case 'GLIDING':
            case 'WAVE':
                return 'GLD';
            default:
                return this.airspace.category;
        }
    }


    public getAirspaceCategoryClass(): string {
        switch (this.airspace.category) {
            case 'A':
            case 'DANGER':
            case 'RESTRICTED':
            case 'PROHIBITED':
                return 'airspace-class-red';
            case 'FIR':
            case 'GLIDING':
            case 'WAVE':
            case 'UIR':
            case 'SPORT':
                return 'airspace-class-green';
            default:
                return 'airspace-class-blue';
        }
    }


    public getAirspaceNameText(): string {
        return this.airspace.name;
    }


    public getAirspaceNameClass(): string {
        switch (this.airspace.category) {
            case 'A':
            case 'DANGER':
            case 'RESTRICTED':
            case 'PROHIBITED':
                return 'airspace-name-red';
            case 'FIR':
            case 'UIR':
            case 'GLIDING':
            case 'WAVE':
            case 'SPORT':
                return 'airspace-name-green';
            default:
                return 'airspace-name-blue';
        }
    }


    public getHeightText(isTop: boolean): string {
        const altitude = isTop ? this.airspace.alt_top : this.airspace.alt_bottom;
        let text = altitude.value.toString();

        switch (altitude.reference) {
            case AltitudeReference.STD:
                text = 'FL ' + text;
                break;
            case AltitudeReference.GND:
                if (altitude.value > 0) {
                    text += ' AGL';
                } else {
                    text = 'GND';
                }
                break;
        }

        return text;
    }


    public getHeightClass(isTop: boolean): string {
        const altitude = isTop ? this.airspace.alt_top : this.airspace.alt_bottom;
        return altitude.reference === AltitudeReference.MSL
            ? 'airspace-overlay-heighttext-agl' // italic
            : 'airspace-overlay-heighttext-normal';
    }
}
