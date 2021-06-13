import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import {OlAirportIcon} from './ol-airport-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';


export class OlAirportRunway {
    private readonly olFeature: Feature;


    public constructor(
        airport: ShortAirport,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(airport, true);
        this.olFeature.setStyle(this.createPointStyle(airport));
        this.olFeature.setGeometry(OlHelper.getPointGeometry(airport.position));
        layer.getSource().addFeature(this.olFeature);
    }


    private createPointStyle(airport: ShortAirport): Style {
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
