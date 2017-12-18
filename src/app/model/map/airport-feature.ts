import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position2d } from '../position';

export interface AirportFeatureRestItem {
    type: string;
    name: string;
}


export class AirportFeature {
    type: string;
    name: string;

    constructor(restItem: AirportFeatureRestItem) {
        this.type = restItem.type;
        this.name = restItem.name;
    }
}


export class AirportFeatureOlFeatureFactory {
    public static createOlFeature(adFeature: AirportFeature, pos: Position2d): ol.Feature {
        const feature = new ol.Feature({
            geometry: new ol.geom.Point(pos.getMercator())
        });

        const style = this.createOlStyle(adFeature);

        if (style) {
            feature.setStyle(style);
            return feature;
        } else {
            return undefined;
        }
    }


    private static createOlStyle(adFeature: AirportFeature): ol.style.Style {
        const src = environment.iconBaseUrl;

        if (adFeature.type !== 'PARACHUTE') {
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
