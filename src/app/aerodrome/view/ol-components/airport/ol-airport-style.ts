import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {OlAirportIcon} from './ol-airport-icon';
import {AirportType} from '../../../domain/model/airport-type';
import {ShortAirport} from '../../../domain/model/short-airport';


export class OlAirportStyle {
    private static readonly FILL_CIV = new Fill({color: '#451A57'});
    private static readonly FILL_MIL = new Fill({color: '#AE1E22'});
    private static readonly STROKE = new Stroke({color: '#FFFFFF', width: 2});



    public static createPointStyle(airport: ShortAirport): Style {
        let name = airport.icao ? airport.icao : '';
        let icon: Icon;

        switch (airport.type) {
            case AirportType.APT:
            case AirportType.INTL_APT:
                icon = OlAirportIcon.APT;
                break;
            case AirportType.AF_MIL_CIVIL:
                icon = OlAirportIcon.AF_MIL_CIVIL;
                break;
            case AirportType.HELI_CIVIL:
            case AirportType.HELI_HOSPITAL:
            case AirportType.HELI_MOUNTAIN:
                icon = OlAirportIcon.HELI_CIVIL;
                break;
            case AirportType.HELI_MIL:
                icon = OlAirportIcon.HELI_MIL;
                break;
            case AirportType.AF_WATER:
                icon = OlAirportIcon.AF_WATER;
                break;
            case AirportType.AD_MIL:
                icon = OlAirportIcon.AD_MIL;
                break;
            case AirportType.AD_CLOSED:
                icon = OlAirportIcon.AD_CLOSED;
                name = '';
                break;
            default:
                icon = OlAirportIcon.AF_CIVIL;
                break;
        }

        return new Style({
            stroke: undefined,
            image: icon,
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: name,
                fill: airport.isMilitary ? this.FILL_MIL : this.FILL_CIV,
                stroke: this.STROKE,
                offsetX: 0,
                offsetY: 25
            })
        });
    }
}
