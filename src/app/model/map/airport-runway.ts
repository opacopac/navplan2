import { environment } from '../../../environments/environment';
import * as ol from 'openlayers';
import { Position2d } from '../position';
import {MapItemGeometryType, MapItemModel, MapItemOlFeature} from './map-item-model';


export interface AirportRunwayRestItem {
    name: string;
    surface: string;
    length: number;
    width: number;
    direction1: number;
    direction2: number;
    tora1: number;
    tora2: number;
    lda1: number;
    lda2: number;
    papi1: boolean;
    papi2: boolean;
}


export class AirportRunway implements MapItemModel {
    name: string;
    surface: string;
    length: number;
    width: number;
    direction1: number;
    direction2: number;
    tora1: number;
    tora2: number;
    lda1: number;
    lda2: number;
    papi1: boolean;
    papi2: boolean;
    position: Position2d;
    isMil: boolean;


    constructor(restItem: AirportRunwayRestItem, position: Position2d, isMil: boolean) {
        this.name = restItem.name;
        this.surface = restItem.surface;
        this.length = restItem.length;
        this.width = restItem.width;
        this.direction1 = restItem.direction1;
        this.tora1 = restItem.tora1;
        this.lda1 = restItem.lda1;
        this.lda2 = restItem.lda2;
        this.papi1 = restItem.papi1;
        this.papi2 = restItem.papi2;
        this.position = position;
        this.isMil = isMil;
    }


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POINT;
    }


    public getGeometry(): Position2d {
        return this.position;
    }
}


export class AirportRunwayOlFeature extends MapItemOlFeature<AirportRunway> {
    protected createOlStyle(): ol.style.Style {
        let src = environment.iconBaseUrl;
        const rwy_surface = this.mapItemModel.surface ? this.mapItemModel.surface : undefined;
        const rwy_direction = this.mapItemModel.direction1 ? this.mapItemModel.direction1 : undefined;

        if (this.mapItemModel.isMil) {
            src += 'rwy_mil.png';
        } else if (rwy_surface === 'ASPH' || rwy_surface === 'CONC') {
            src += 'rwy_concrete.png';
        } else if (rwy_surface !== 'WATE') {
            src += 'rwy_grass.png';
        } else {
            return undefined;
        }

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                rotation: (rwy_direction - 45) / 180 * Math.PI,
                rotateWithView: true,
                opacity: 0.75,
                src: src
            }))
        });
    }

}
