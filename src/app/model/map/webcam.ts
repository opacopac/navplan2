import { environment } from '../../../environments/environment';
import * as ol from 'openlayers';
import { Position2d } from '../position';


export interface WebcamRestItem {
    id: number;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
}


export class Webcam {
    id: number;
    name: string;
    url: string;
    position: Position2d;


    constructor(restItem: WebcamRestItem) {
        this.id = restItem.id;
        this.name = restItem.name;
        this.url = restItem.url;
        this.position = new Position2d(restItem.longitude, restItem.latitude);
    }
}



export class WebcamOlFeatureFactory {
    public static createOlFeature(webcam: Webcam): ol.Feature {
        const feature = new ol.Feature({
            geometry: new ol.geom.Point(webcam.position.getMercator())
        });

        const style = this.createOlStyle(webcam);
        if (style) {
            feature.setStyle(style);
            return feature;
        } else {
            return undefined;
        }
    }


    private static createOlStyle(webcam: Webcam): ol.style.Style {
        const src = environment.iconBaseUrl;

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 0.9,
                src: src + 'webcam.png'
            }))
        });
    }
}
