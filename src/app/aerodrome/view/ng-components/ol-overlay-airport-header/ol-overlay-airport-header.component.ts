import {Component, Input} from '@angular/core';
import {Airport} from '../../../domain/model/airport';
import {AirportType} from '../../../domain/model/airport-type';
import {OlAirportIcon} from '../../ol-components/airport/ol-airport-icon';
import {IWmmService} from '../../../../geo-physics/domain/service/wmm/i-wmm.service';
import {OlAirportRunwayIcon} from '../../ol-components/airport/ol-airport-runway-icon';


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
            case AirportType.AF_MOUNTAIN : return 'Mountain Landing Site';
            case AirportType.AF_MIL_CIVIL : return 'Airfield (civil/military)';
            case AirportType.AF_WATER : return 'Water Airfield';
            case AirportType.APT : return 'Airport resp. Airfield IFR';
            case AirportType.GLIDING : return 'Glider Site';
            case AirportType.HELI_CIVIL : return 'Civil Heliport';
            case AirportType.HELI_HOSPITAL : return 'Hospital Landing Site';
            case AirportType.HELI_MIL : return 'Military Heliport';
            case AirportType.HELI_MOUNTAIN : return 'Mountain Landing Site';
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

        return OlAirportRunwayIcon.getRwyUrl(this.airport.runways[0].surface, this.airport.isMilitary);
    }


    public getRwyRotDeg(): number {
        if (!this.airport.hasRunways) {
            return 0;
        }

        const rwy = this.airport.runways[0];
        if (rwy.directionContainsMagneticVariation()) {
            return rwy.direction;
        }
        const magVar = this.wmmService.calcMagneticVariation(this.airport.position);

        return rwy.direction + magVar.deg;
    }
}
