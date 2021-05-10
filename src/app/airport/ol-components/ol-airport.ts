import {Feature} from 'ol';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {OlAirportRunway} from './ol-airport-runway';
import {OlAirportFeature} from './ol-airport-feature';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {OlAirportIcon} from './ol-airport-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {AirportType} from '../domain-model/airport-type';
import VectorLayer from 'ol/layer/Vector';
import {ShortAirport} from '../domain-model/short-airport';


export class OlAirport extends OlComponentBase {
    private readonly olFeature: Feature;
    public readonly olRunway: OlAirportRunway;
    public readonly olAdFeatures: OlAirportFeature[];


    public constructor(
        airport: ShortAirport,
        layer: VectorLayer
    ) {
        super();

        // airport
        this.olFeature = this.createFeature(airport);
        this.olFeature.setStyle(this.createPointStyle(airport));
        this.setPointGeometry(this.olFeature, airport.position);
        layer.getSource().addFeature(this.olFeature);

        // runway
        if (airport.hasRunways && !airport.isClosed && !airport.isHeliport) {
            this.olRunway = new OlAirportRunway(airport, layer);
        }

        // airport-features
        this.olAdFeatures = [];
        for (const adFeature of airport.featureTypes) {
            this.olAdFeatures.push(new OlAirportFeature(airport, adFeature, layer));
        }
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(airport: ShortAirport): Style {
        const src = OlAirportIcon.getUrl(airport.type);
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

        return new Style({
            stroke: undefined,
            image: new Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.FRACTION,
                scale: 1,
                opacity: 0.9,
                src: src,
            })),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: name,
                fill: new Fill({color: textColor}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 25
            })
        });
    }
}
