import * as ol from 'openlayers';
import {environment} from '../../../environments/environment';
import {OlAirportRunway} from './ol-airport-runway';
import {OlAirportFeature} from './ol-airport-feature';
import {Airport, AirportType} from '../model/airport';
import {OlComponent} from '../../shared/ol-component/ol-component';


export class OlAirport extends OlComponent {
    private readonly olFeature: ol.Feature;
    private readonly olRunway: OlAirportRunway;
    private readonly olAdFeatures: OlAirportFeature[];


    public constructor(
        airport: Airport,
        private readonly source: ol.source.Vector) {

        super();

        // airport
        this.olFeature = this.createFeature(airport);
        this.olFeature.setStyle(this.createPointStyle(airport));
        this.setPointGeometry(this.olFeature, airport.position);
        this.source.addFeature(this.olFeature);

        // runway
        if (airport.hasRunways) {
            this.olRunway = new OlAirportRunway(airport, airport.runways[0], source);
        }

        // airport-features
        this.olAdFeatures = [];
        for (const adFeature of airport.features) {
            this.olAdFeatures.push(new OlAirportFeature(airport, adFeature, source));
        }
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(airport: Airport): ol.style.Style {
        let src = environment.iconBaseUrl;
        let textColor = '#451A57';
        let name = airport.icao ? airport.icao : '';

        switch (airport.type) {
            case AirportType.APT:
            case AirportType.INTL_APT:
                src += 'ad_civ.png';
                break;
            case AirportType.AF_CIVIL:
            case AirportType.GLIDING:
            case AirportType.LIGHT_AIRCRAFT:
                src += 'ad_civ_nofac.png';
                break;
            case AirportType.AF_MIL_CIVIL:
                src += 'ad_civmil.png';
                break;
            case AirportType.HELI_CIVIL:
                src += 'ad_heli.png';
                break;
            case AirportType.HELI_MIL:
                src += 'ad_heli_mil.png';
                break;
            case AirportType.AF_WATER:
                src += 'ad_water.png';
                break;
            case AirportType.AD_MIL:
                src += 'ad_mil.png';
                textColor = '#AE1E22';
                break;
            case AirportType.AD_CLOSED:
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
