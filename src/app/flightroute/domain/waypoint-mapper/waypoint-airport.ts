import {WaypointBase} from './waypoint-base';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {Airport, AirportRadio} from '../../../map-features/domain/airport';
import {WaypointType} from '../waypoint-type';
import {UnitconversionService} from '../../../shared/services/unitconversion/unitconversion.service';


export class WaypointAirport extends WaypointBase {
    constructor(public airport: Airport) {
        super();
    }


    public getType(): WaypointType {
        return WaypointType.airport;
    }


    public getPosition(): Position2d {
        return this.airport.position;
    }


    public getFrequency(): string {
        if (this.airport.radios.length > 0) {
            return this.airport.radios[0].frequency; // TODO: format?
        } else {
            return '';
        }
    }


    public getCallsign(): string {
        if (this.airport.radios.length === 0) {
            return '';
        } else {
            return this.getRadioCallsign(this.airport.radios[0]);
        }

    }


    public getCheckpoint(): string {
        if (this.airport.icao) {
            return this.airport.icao;
        } else {
            return this.airport.name;
        }
    }


    public getSuppInfo(): string {
        let i: number;
        const suppInfoPart: string[] = [];

        // altitude
        if (this.airport.elevation) {
            const elevString = Math.round(this.airport.elevation.ft) + 'ft';
            suppInfoPart.push('ELEV:' + elevString);
        }

        // runways
        if (this.airport.runways && this.airport.runways.length > 0) {
            const runwayStringList: string[] = [];
            for (i = 0; i < this.airport.runways.length; i++) {
                const rwy = this.airport.runways[i];
                // skip GLD strip unless it's the only rwy
                if (rwy.name.toString().indexOf('GLD') === -1 || this.airport.runways.length === 1) {
                    runwayStringList.push(rwy.name);
                }
            }
            suppInfoPart.push('RWY:' + runwayStringList.join(','));
        }

        // frequencies
        if (this.airport.radios && this.airport.radios.length > 0) {
            const radioStringList: string[] = [];
            for (i = 0; i < this.airport.radios.length; i++) {
                const radio = this.airport.radios[i];
                const callsign = this.getRadioCallsign(radio);
                // skip GLD, FIS, VDF freq unless it's the only frequency
                if ((radio.type !== 'GLIDING' && radio.type !== 'INFO' && radio.type !== 'FIS' && callsign !== 'VDF')
                    || this.airport.radios.length === 1) {
                    radioStringList.push(callsign + ':' + radio.frequency);
                }
            }

            suppInfoPart.push(radioStringList.join(' '));
        }

        return suppInfoPart.join(' ');
    }



    private getRadioCallsign(radio: AirportRadio): string {
        switch (radio.type) {
            case 'TOWER' : return 'TWR';
            case 'APPROACH' : return 'APP';
            case 'ARRIVAL' : return 'ARR';
            case 'DEPARTURE' : return 'DEP';
            case 'GLIDING' : return 'GLD';
            case 'GROUND' : return 'GND';
            case 'CTAF' :
                // spezialregel nur für country = CH
                if (this.airport.country === 'CH') {
                    return 'AD';
                } else {
                    return 'CTAF';
                }
            case 'AFIS' : return 'AFIS';
            case 'OTHER' : {
                // starts with AD...
                if (radio.description.toUpperCase().indexOf('AD') === 0) {
                    return 'AD';
                } else {
                    return radio.typespec;
                }
            }
            default : return radio.type;
        }
    }
}
