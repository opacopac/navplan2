import { environment } from '../../../environments/environment';
import * as ol from 'openlayers';
import { Position2d } from '../position';


export interface UserPointRestItem {
    id: number;
    type: string;
    name: string;
    latitude: number;
    longitude: number;
    remark: string;
    supp_info: string;
}


export class Userpoint {
    id: number;
    type: string;
    name: string;
    position: Position2d;
    latitude: number;
    longitude: number;
    remark: string;
    supp_info: string;


    constructor(restItem: UserPointRestItem) {
        this.id = restItem.id;
        this.type = restItem.type;
        this.name = restItem.name;
        this.position = new Position2d(restItem.longitude, restItem.latitude);
        this.remark = restItem.remark;
        this.supp_info = restItem.supp_info;
    }
}


export class UserpointOlFeatureFactory {
    public static createOlFeature(userpoint: Userpoint): ol.Feature {
        const feature = new ol.Feature({
            geometry: new ol.geom.Point(userpoint.position.getMercator())
        });

        const style = UserpointOlFeatureFactory.createOlStyle(userpoint);

        if (style) {
            feature.setStyle(style);
            return feature;
        } else {
            return undefined;
        }
    }


    private static createOlStyle(userpoint: Userpoint): ol.style.Style {
        const src = environment.iconBaseUrl;

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 0.75,
                src: src + 'wp_user.png'
            })),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: userpoint.name,
                fill: new ol.style.Fill({color: '#0077FF'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}
