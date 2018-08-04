import * as ol from 'openlayers';
import {OlAirportRunway} from './ol-airport-runway';
import {OlAirportFeature} from './ol-airport-feature';
import {Airport, AirportType} from '../model/airport';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {AirportIcon} from '../model/airport-icon';


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
        if (airport.hasRunways && !airport.isClosed && !airport.isHeliport) {
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
        const src = AirportIcon.getUrl(airport.type);
        let textColor = '#451A57';
        let name = airport.icao ? airport.icao : '';

        switch (airport.type) {
            case AirportType.AD_MIL:
            case AirportType.HELI_MIL:
                textColor = '#AE1E22';
                break;
            case AirportType.AD_CLOSED:
                name = '';
                break;
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
