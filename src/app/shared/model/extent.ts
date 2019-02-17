import * as ol from 'openlayers';
import {Position2d} from './geometry/position2d';
import {GeocalcService} from '../services/geocalc/geocalc.service';
import {Length} from './quantities/length';


const MERCATOR_PROJECTION = 'EPSG:3857';
const LONLAT_PROJECTION = 'EPSG:4326';


export class Extent {
    public constructor(
        public minLon: number,
        public minLat: number,
        public maxLon: number,
        public maxLat: number
    ) {
    }


    public static createFromMercator(extent: [number, number, number, number]): Extent {
        const ext = ol.proj.transformExtent(extent, MERCATOR_PROJECTION, LONLAT_PROJECTION);
        return new Extent(ext[0], ext[1], ext[2], ext[3]);
    }


    public get minPos(): Position2d {
        return new Position2d(this.minLon, this.minLat);
    }


    public get maxPos(): Position2d {
        return new Position2d(this.maxLon, this.maxLat);
    }


    public getAsLatLon(): [number, number, number, number] {
        return this.getExtent();
    }


    public getAsMercator(): [number, number, number, number] {
        return ol.proj.transformExtent(this.getExtent(), LONLAT_PROJECTION, MERCATOR_PROJECTION);
    }


    public getMidPos(): Position2d {
        return new Position2d(
            (this.minLon + this.maxLon) / 2,
            (this.minLat + this.maxLat) / 2
        );
    }


    public getRadius(): Length {
        return GeocalcService.calcDistance(this.minPos, this.getMidPos());
    }


    public containsExtent(extent: Extent): boolean {
        return (this.minLon <= extent.minLon
            && this.minLat <= extent.minLat
            && this.maxLon >= extent.maxLon
            && this.maxLat >= extent.maxLat);
    }


    public getOversizeExtent(factor: number): Extent {
        const halfDiffLon = (this.maxLon - this.minLon) / 2;
        const halfDiffLat = (this.maxLat - this.minLat) / 2;
        const centerLon = this.minLon + halfDiffLon;
        const centerLat = this.minLat + halfDiffLat;

        return new Extent(
            centerLon - halfDiffLon * factor,
            centerLat - halfDiffLat * factor,
            centerLon + halfDiffLon * factor,
            centerLat + halfDiffLat * factor
        );
    }


    private getExtent(): [number, number, number, number] {
        return [this.minLon, this.minLat, this.maxLon, this.maxLat];
    }
}
