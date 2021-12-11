import {Component, Input} from '@angular/core';
import {Airport} from '../../../aerodrome/domain-model/airport';
import {AirportType} from '../../../aerodrome/domain-model/airport-type';
import {OlAirportIcon} from '../../ol-components/airport/ol-airport-icon';
import {IWmmService} from '../../../geo-physics/domain-service/wmm/i-wmm.service';


@Component({
    selector: 'app-ol-overlay-airport-header',
    templateUrl: './ol-overlay-airport-header.component.html',
    styleUrls: ['./ol-overlay-airport-header.component.css']
})
export class OlOverlayAirportHeaderComponent  {
    @Input() public airport: Airport;


    public constructor(private wmmService: IWmmService) {
    }


    public getTitle(): string {
        let title = this.airport.name;
        if (this.airport.icao) {
            title += ' (' + this.airport.icao + ')';
        }
        return title;
    }


    public getAirportTypeString(): string {
        switch (this.airport.type) {
            case AirportType.AD_CLOSED : return 'Closed Aerodrome';
            case AirportType.AD_MIL : return 'Military Aerodrome';
            case AirportType.AF_CIVIL : return 'Civil Airfield';
            case AirportType.AF_MIL_CIVIL : return 'Airfield (civil/military)';
            case AirportType.AF_WATER : return 'Water Airfield';
            case AirportType.APT : return 'Airport resp. Airfield IFR';
            case AirportType.GLIDING : return 'Glider Site';
            case AirportType.HELI_CIVIL : return 'Civil Heliport';
            case AirportType.HELI_MIL : return 'Military Heliport';
            case AirportType.INTL_APT : return 'International Airport';
            case AirportType.LIGHT_AIRCRAFT : return 'Ultra Light Flying Site';
            default : return 'Unknown';
        }
    }


    public getAvatarUrl(): string {
        return OlAirportIcon.getUrl(this.airport.type);
    }


    public getRwyUrl(): string {
        if (!this.airport.hasRunways) {
            return '';
        }

        return OlAirportIcon.getRwyUrl(this.airport.runways[0].surface, this.airport.isMilitary);
    }


    public getRwyRotDeg(): number {
        if (!this.airport.hasRunways) {
            return 0;
        }

        const rwy = this.airport.runways[0];
        if (rwy.directionContainsMagneticVariation()) {
            return rwy.direction1;
        }
        const magVar = this.wmmService.calcMagneticVariation(this.airport.position);

        return rwy.direction1 + magVar.deg;
    }
}
