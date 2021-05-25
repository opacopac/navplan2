import {Airport} from '../../../aerodrome/domain-model/airport';
import {WaypointType} from '../waypoint-type';
import {AirportRadio} from '../../../aerodrome/domain-model/airport-radio';
import {Waypoint} from '../waypoint';
import {WaypointAltitude} from '../waypoint-altitude';


export class AirportWaypointConverter {
    public static convert(airport: Airport): Waypoint {
        return new Waypoint(
            WaypointType.airport,
            AirportWaypointConverter.getFrequency(airport),
            AirportWaypointConverter.getCallsign(airport),
            AirportWaypointConverter.getCheckpoint(airport),
            '',
            AirportWaypointConverter.getSuppInfo(airport),
            airport.position,
            new WaypointAltitude()
        );
    }

    private static getFrequency(airport: Airport): string {
        if (airport.radios.length > 0) {
            return airport.radios[0].frequency; // TODO: format?
        } else {
            return '';
        }
    }


    private static getCallsign(airport: Airport): string {
        if (airport.radios.length === 0) {
            return '';
        } else {
            return AirportWaypointConverter.getRadioCallsign(airport, airport.radios[0]);
        }

    }


    private static getCheckpoint(airport: Airport): string {
        if (airport.icao) {
            return airport.icao;
        } else {
            return airport.name;
        }
    }


    private static getSuppInfo(airport: Airport): string {
        let i: number;
        const suppInfoPart: string[] = [];

        // altitude
        if (airport.elevation) {
            const elevString = Math.round(airport.elevation.ft) + 'ft';
            suppInfoPart.push('ELEV:' + elevString);
        }

        // runways
        if (airport.runways && airport.runways.length > 0) {
            const runwayStringList: string[] = [];
            for (i = 0; i < airport.runways.length; i++) {
                const rwy = airport.runways[i];
                // skip GLD strip unless it's the only rwy
                if (rwy.name.toString().indexOf('GLD') === -1 || airport.runways.length === 1) {
                    runwayStringList.push(rwy.name);
                }
            }
            suppInfoPart.push('RWY:' + runwayStringList.join(','));
        }

        // frequencies
        if (airport.radios && airport.radios.length > 0) {
            const radioStringList: string[] = [];
            for (i = 0; i < airport.radios.length; i++) {
                const radio = airport.radios[i];
                const callsign = AirportWaypointConverter.getRadioCallsign(airport, radio);
                // skip GLD, FIS, VDF freq unless it's the only frequency
                if ((radio.type !== 'GLIDING' && radio.type !== 'INFO' && radio.type !== 'FIS' && callsign !== 'VDF')
                    || airport.radios.length === 1) {
                    radioStringList.push(callsign + ':' + radio.frequency);
                }
            }

            suppInfoPart.push(radioStringList.join(' '));
        }

        return suppInfoPart.join(' ');
    }


    private static getRadioCallsign(airport: Airport, radio: AirportRadio): string {
        switch (radio.type) {
            case 'TOWER' : return 'TWR';
            case 'APPROACH' : return 'APP';
            case 'ARRIVAL' : return 'ARR';
            case 'DEPARTURE' : return 'DEP';
            case 'GLIDING' : return 'GLD';
            case 'GROUND' : return 'GND';
            case 'CTAF' :
                // spezialregel nur für country = CH
                if (airport.country === 'CH') {
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
