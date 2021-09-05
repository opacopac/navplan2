import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {OlAirportRunway} from './ol-airport-runway';
import {OlAirportFeature} from './ol-airport-feature';
import {OlAirportIcon} from './ol-airport-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {AirportType} from '../../../aerodrome/domain-model/airport-type';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';
import {OlFeature} from '../../../base-map/ol-model/ol-feature';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';


export class OlAirport {
    public static draw(
        airport: ShortAirport,
        layer: OlVectorLayer
    ) {
        // airport
        const olFeature = new OlFeature(airport, true);
        olFeature.setStyle(this.createPointStyle(airport));
        olFeature.setGeometry(OlGeometry.fromPoint(airport.position));
        layer.addFeature(olFeature);

        // runway
        if (airport.hasRunways && !airport.isClosed && !airport.isHeliport) {
            OlAirportRunway.draw(airport, layer);
        }

        // airport-features
        for (const adFeature of airport.featureTypes) {
            OlAirportFeature.draw(airport, adFeature, layer);
        }
    }


    private static createPointStyle(airport: ShortAirport): Style {
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
