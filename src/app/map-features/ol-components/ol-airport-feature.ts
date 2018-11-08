import * as ol from 'openlayers';
import {environment} from '../../../environments/environment';
import {Airport, AirportFeature} from '../model/airport';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';


export class OlAirportFeature extends OlComponentBase {
    private readonly olFeature: ol.Feature;


    public constructor(
        airport: Airport,
        airportFeature: AirportFeature,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(airport);
        this.olFeature.setStyle(this.createPointStyle(airportFeature));
        this.setPointGeometry(this.olFeature, airport.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    protected createPointStyle(airportFeature: AirportFeature): ol.style.Style {
        const src = environment.iconBaseUrl;

        if (airportFeature.type !== 'PARACHUTE') {
            return undefined;
        }

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [45, 16],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                rotateWithView: false,
                opacity: 0.8,
                src: src + 'feature_parachute.png'
            }))
        });
    }
}
