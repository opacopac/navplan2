import * as ol from 'openlayers';
import {Airport, AirportRunway} from '../model/airport';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {AirportIcon} from '../model/airport-icon';


export class OlAirportRunway extends OlComponentBase {
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


    private createPointStyle(airport: Airport, runway: AirportRunway): ol.style.Style {
        const src = AirportIcon.getRwyUrl(airport, runway);
        const rwy_direction = runway.direction1 ? runway.direction1 : undefined;
        if (!src || ! rwy_direction) {
            return undefined;
        }

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                rotation: (rwy_direction) / 180 * Math.PI,
                rotateWithView: true,
                opacity: 0.9,
                src: src
            }))
        });
    }
}
