import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {OlAirportIcon} from './ol-airport-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';
import {ShortAirport} from '../domain-model/short-airport';


export class OlAirportRunway extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        airport: ShortAirport,
        layer: VectorLayer
    ) {
        super();

        this.olFeature = this.createFeature(airport);
        this.olFeature.setStyle(this.createPointStyle(airport));
        this.setPointGeometry(this.olFeature, airport.position);
        layer.getSource().addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(airport: ShortAirport): Style {
        const src = OlAirportIcon.getRwyUrl(airport.rwy1Surface, airport.isMilitary);
        let rwy_direction = airport.rwy1Direction ? airport.rwy1Direction : undefined;
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
