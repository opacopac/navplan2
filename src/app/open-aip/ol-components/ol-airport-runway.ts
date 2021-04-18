import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import {Airport} from '../domain-model/airport';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {OlAirportIcon} from './ol-airport-icon';
import {AirportRunway} from '../domain-model/airport-runway';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {WmmHelper} from '../../common/geo-math/domain-service/wmm-helper';
import VectorLayer from 'ol/layer/Vector';


export class OlAirportRunway extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        airport: Airport,
        runway: AirportRunway,
        layer: VectorLayer
    ) {
        super();

        this.olFeature = this.createFeature(airport);
        this.olFeature.setStyle(this.createPointStyle(airport, runway));
        this.setPointGeometry(this.olFeature, airport.position);
        layer.getSource().addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(airport: Airport, runway: AirportRunway): Style {
        const src = OlAirportIcon.getRwyUrl(airport, runway);
        let rwy_direction = runway.direction1 ? runway.direction1 : undefined;
        if (!src || !rwy_direction) {
            return undefined;
        }

        if (!runway.directionContainsMagneticVariation()) {
            rwy_direction += WmmHelper.calcMagneticVariation(airport.position).deg;
        }

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
