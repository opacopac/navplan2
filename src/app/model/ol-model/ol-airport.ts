import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Airport } from '../map/airport';
import { OlFeaturePoint } from './ol-feature';
import { OlAirportRunway } from './ol-airport-runway';
import { OlAirportFeature } from './ol-airport-feature';


export class OlAirport extends OlFeaturePoint {
    public constructor(
        private airport: Airport) {

        super();
    }


    public getPosition() {
        return this.airport.position;
    }


    public draw(source: ol.source.Vector) {
        super.draw(source);

        // runways
        if (this.airport.runways && this.airport.runways.length > 0) {
            const rwyOlFeature = new OlAirportRunway(this.airport.runways[0]);
            rwyOlFeature.draw(source);
        }

        // airportfeatures
        for (const adFeature of this.airport.features) {
            const adFeatureOlFeature = new OlAirportFeature(adFeature);
            adFeatureOlFeature.draw(source);
        }
    }


    protected createPointStyle(): ol.style.Style {
        let src = environment.iconBaseUrl;
        let textColor = '#451A57';
        let name = this.airport.icao ? this.airport.icao : '';

        switch (this.airport.type) {
            case 'APT':
            case 'INTL_APT':
                src += 'ad_civ.png';
                break;
            case 'AF_CIVIL':
            case 'GLIDING':
            case 'LIGHT_AIRCRAFT':
                src += 'ad_civ_nofac.png';
                break;
            case 'AF_MIL_CIVIL':
                src += 'ad_civmil.png';
                break;
            case 'HELI_CIVIL':
                src += 'ad_heli.png';
                break;
            case 'HELI_MIL':
                src += 'ad_heli_mil.png';
                break;
            case 'AF_WATER':
                src += 'ad_water.png';
                break;
            case 'AD_MIL':
                src += 'ad_mil.png';
                textColor = '#AE1E22';
                break;
            case 'AD_CLOSED':
                src += 'ad_closed.png';
                name = '';
                break;
            default:
                return undefined;
        }

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 0.75,
                src: src
            })),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: name,
                fill: new ol.style.Fill({color: textColor}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 25
            })
        });
    }
}
