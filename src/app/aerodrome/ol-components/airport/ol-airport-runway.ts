import {Icon, Style} from 'ol/style';
import {OlAirportIcon} from './ol-airport-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {ShortAirport} from '../../domain-model/short-airport';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';
import {OlFeature} from '../../../base-map/ol-model/ol-feature';


export class OlAirportRunway {
    public static draw(
        airport: ShortAirport,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(airport, true);
        olFeature.setStyle(this.createPointStyle(airport));
        olFeature.setGeometry(OlGeometry.fromPoint(airport.position));
        layer.addFeature(olFeature);
    }


    private static createPointStyle(airport: ShortAirport): Style {
        const src = OlAirportIcon.getRwyUrl(airport.rwy1Surface, airport.isMilitary);
        const rwy_direction = airport.rwy1Direction ? airport.rwy1Direction : undefined;
        if (!src || !rwy_direction) {
            return undefined;
        }

        // TODO
        /*if (!runway.directionContainsMagneticVariation()) {
            rwy_direction += WmmHelper.calcMagneticVariation(airport.position).deg;
        }*/

        return new Style({
            image: new Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.FRACTION,
                scale: 1,
                rotation: (rwy_direction) / 180 * Math.PI,
                rotateWithView: true,
                opacity: 0.9,
                src: src
            }))
        });
    }
}
