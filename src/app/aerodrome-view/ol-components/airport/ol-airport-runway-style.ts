import {Style} from 'ol/style';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';
import {OlAirportRunwayIcon} from './ol-airport-runway-icon';


export class OlAirportRunwayStyle {
    public static createPointStyle(airport: ShortAirport): Style {
        const rwy_direction = airport.rwy1Direction >= 0 ? airport.rwy1Direction : -1;
        if (rwy_direction === -1) {
            return undefined;
        }

        // TODO
        /*if (!runway.directionContainsMagneticVariation()) {
            rwy_direction += WmmHelper.calcMagneticVariation(airport.position).deg;
        }*/

        const icon = OlAirportRunwayIcon.createIcon(airport.rwy1Surface, airport.isMilitary, rwy_direction);
        if (!icon) {
            return undefined;
        }

        return new Style({image: icon});
    }
}
