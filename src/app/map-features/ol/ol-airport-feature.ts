import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Icon, Style} from 'ol/style';
import {environment} from '../../../environments/environment';
import {Airport, AirportFeature} from '../domain/airport';
import {OlComponentBase} from '../../base-map/ol/ol-component-base';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlAirportFeature extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        airport: Airport,
        airportFeature: AirportFeature,
        private readonly source: Vector) {

        super();

        this.olFeature = this.createFeature(airport);
        this.olFeature.setStyle(this.createPointStyle(airportFeature));
        this.setPointGeometry(this.olFeature, airport.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    protected createPointStyle(airportFeature: AirportFeature): Style {
        const src = environment.iconBaseUrl;

        if (airportFeature.type !== 'PARACHUTE') {
            return undefined;
        }

        return new Style({
            image: new Icon(({
                anchor: [45, 16],
                anchorXUnits: IconAnchorUnits.PIXELS,
                anchorYUnits: IconAnchorUnits.PIXELS,
                scale: 1,
                rotateWithView: false,
                opacity: 0.8,
                src: src + 'feature_parachute.png'
            }))
        });
    }
}
