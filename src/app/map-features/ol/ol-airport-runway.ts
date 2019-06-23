import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Icon, Style} from 'ol/style';
import {Airport} from '../domain/airport';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {AirportIcon} from '../domain/airport-icon';
import {AirportRunway} from '../domain/airport-runway';
import {GeocalcService} from '../../shared/services/geocalc/geocalc.service';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlAirportRunway extends OlComponentBase {
    private readonly olFeature: Feature;

    public constructor(
        airport: Airport,
        runway: AirportRunway,
        private readonly source: Vector) {

        super();

        this.olFeature = this.createFeature(airport);
        this.olFeature.setStyle(this.createPointStyle(airport, runway));
        this.setPointGeometry(this.olFeature, airport.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(airport: Airport, runway: AirportRunway): Style {
        const src = AirportIcon.getRwyUrl(airport, runway);
        let rwy_direction = runway.direction1 ? runway.direction1 : undefined;
        if (!src || ! rwy_direction) {
            return undefined;
        }

        if (!runway.directionContainsMagneticVariation()) {
            rwy_direction += GeocalcService.calcMagneticVariation(airport.position).deg;
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
