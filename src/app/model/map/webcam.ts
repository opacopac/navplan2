import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { MapItemGeometryType, MapItemModel, MapItemOlFeature } from './map-item-model';
import { Position2d } from '../position';


export interface WebcamRestItem {
    id: number;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
}


export class Webcam implements MapItemModel {
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


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POINT;
    }


    public getGeometry(): Position2d {
        return this.position;
    }
}


export class WebcamOlFeature extends MapItemOlFeature {
    public mapItemModel: Webcam;


    public constructor(webcam: Webcam) {
        super(webcam);
    }


    protected createOlStyle(): ol.style.Style {
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
