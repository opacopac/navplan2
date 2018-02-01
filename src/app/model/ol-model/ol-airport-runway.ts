import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { AirportRunway } from '../airport';
import { OlFeaturePoint } from './ol-feature';
import { Position2d } from '../position';


export class OlAirportRunway extends OlFeaturePoint {
    public constructor(
        private runway: AirportRunway) {

        super();
    }


    protected getPosition(): Position2d {
        return this.runway.position;
    }


    protected createPointStyle(): ol.style.Style {
        let src = environment.iconBaseUrl;
        const rwy_surface = this.runway.surface ? this.runway.surface : undefined;
        const rwy_direction = this.runway.direction1 ? this.runway.direction1 : undefined;

        if (this.runway.isMil) {
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
