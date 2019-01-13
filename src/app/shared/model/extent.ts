import * as ol from 'openlayers';
import {Position2d} from './geometry/position2d';
import {GeocalcService} from '../services/geocalc/geocalc.service';
import {Distance} from './quantities/distance';


const MERCATOR_PROJECTION = 'EPSG:3857';
const LONLAT_PROJECTION = 'EPSG:4326';


export class Extent {
    [index: number]: number;


    private constructor() {
    }


    public static createFromLatLon(extent: [number, number, number, number]): Extent {
        const ext = new Extent();
        ext.setExtent(extent);

        return ext;
    }


    public static createFromMercator(extent: [number, number, number, number]): Extent {
        const ext = new Extent();
        ext.setExtent(ol.proj.transformExtent(extent, MERCATOR_PROJECTION, LONLAT_PROJECTION));

        return ext;
    }


    public get minLon(): number {
        return this[0];
    }


    public get minLat(): number {
        return this[1];
    }


    public get maxLon(): number {
        return this[2];
    }


    public get maxLat(): number {
        return this[3];
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


    public getRadius(): Distance {
        return GeocalcService.getDistance(this.minPos, this.getMidPos());
    }


    public containsExtent(extent: Extent): boolean {
        return (this[0] <= extent[0]
            && this[1] <= extent[1]
            && this[2] >= extent[2]
            && this[3] >= extent[3]);
    }


    public getOversizeExtent(factor: number): Extent {
        const halfDiffLon = (this[2] - this[0]) / 2;
        const halfDiffLat = (this[3] - this[1]) / 2;
        const centerLon = this[0] + halfDiffLon;
        const centerLat = this[1] + halfDiffLat;

        return Extent.createFromLatLon([centerLon - halfDiffLon * factor,
          centerLat - halfDiffLat * factor,
          centerLon + halfDiffLon * factor,
          centerLat + halfDiffLat * factor]);
    }


    private getExtent(): [number, number, number, number] {
        return [this[0], this[1], this[2], this[3]];
    }


    private setExtent(extent: [number, number, number, number]) {
        this[0] = extent[0];
        this[1] = extent[1];
        this[2] = extent[2];
        this[3] = extent[3];
    }
}
