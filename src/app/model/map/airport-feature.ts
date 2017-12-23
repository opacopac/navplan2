import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position2d } from '../position';
import {MapItemGeometryType, MapItemModel, MapItemOlFeature} from './map-item-model';


export interface AirportFeatureRestItem {
    type: string;
    name: string;
}


export class AirportFeature implements MapItemModel {
    type: string;
    name: string;
    position: Position2d;

    constructor(restItem: AirportFeatureRestItem, position: Position2d) {
        this.type = restItem.type;
        this.name = restItem.name;
        this.position = position;
    }


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POINT;
    }


    public getGeometry(): Position2d {
        return this.position;
    }
}


export class AirportFeatureOlFeature extends MapItemOlFeature {
    public mapItemModel: AirportFeature;


    public constructor(airportFeature: AirportFeature) {
        super(airportFeature);
    }


    protected createOlStyle(): ol.style.Style {
        const src = environment.iconBaseUrl;

        if (this.mapItemModel.type !== 'PARACHUTE') {
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
