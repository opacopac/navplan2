import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position2d } from '../position';
import { MapItemGeometryType, MapItemModel, MapItemOlFeature } from './map-item-model';


export interface UserPointRestItem {
    id: number;
    type: string;
    name: string;
    latitude: number;
    longitude: number;
    remark: string;
    supp_info: string;
}


export class Userpoint implements MapItemModel {
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


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POINT;
    }


    public getGeometry(): Position2d {
        return this.position;
    }
}


export class UserpointOlFeature extends MapItemOlFeature {
    public mapItemModel: Userpoint;


    public constructor(userpoint: Userpoint) {
        super(userpoint);
    }


    protected createOlStyle(): ol.style.Style {
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
                text: this.mapItemModel.name,
                fill: new ol.style.Fill({color: '#0077FF'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}
