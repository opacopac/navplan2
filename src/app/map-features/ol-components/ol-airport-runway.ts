import * as ol from 'openlayers';
import {environment} from '../../../environments/environment';
import {Airport, AirportRunway} from '../model/airport';
import {OlComponent} from '../../shared/ol-component/ol-component';


export class OlAirportRunway extends OlComponent {
    private readonly olFeature: ol.Feature;

    public constructor(
        airport: Airport,
        runway: AirportRunway,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(airport);
        this.olFeature.setStyle(this.createPointStyle(airport, runway));
        this.setPointGeometry(this.olFeature, airport.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    public destroy() {
        this.removeFeature(this.olFeature, this.source);
    }


    private createPointStyle(airport: Airport, runway: AirportRunway): ol.style.Style {
        let src = environment.iconBaseUrl;
        const rwy_surface = runway.surface ? runway.surface : undefined;
        const rwy_direction = runway.direction1 ? runway.direction1 : undefined;

        if (airport.isMilitary) {
            src += 'rwy_mil.png';
        } else if (rwy_surface === 'ASPH' || rwy_surface === 'CONC') {
            src += 'rwy_concrete.png';
        } else if (rwy_surface !== 'WATE') {
            src += 'rwy_grass.png';
        } else {
            return undefined;
        }

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                rotation: (rwy_direction - 45) / 180 * Math.PI,
                rotateWithView: true,
                opacity: 0.75,
                src: src
            }))
        });
    }
}
