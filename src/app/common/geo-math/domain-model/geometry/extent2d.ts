import {Position2d} from './position2d';
import {GeodesyHelper} from '../../domain-service/geodesy-helper';
import {Length} from '../quantities/length';
import {Clonable} from '../../../../system/domain-model/clonable';
import {transformExtent} from 'ol/proj';


const MERCATOR_PROJECTION = 'EPSG:3857';
const LONLAT_PROJECTION = 'EPSG:4326';


export class Extent2d implements Clonable<Extent2d> {
    public constructor(
        public minLon: number,
        public minLat: number,
        public maxLon: number,
        public maxLat: number
    ) {
    }


    public static createFromMercator(extent: [number, number, number, number]): Extent2d {
        const ext = transformExtent(extent, MERCATOR_PROJECTION, LONLAT_PROJECTION);
        return new Extent2d(ext[0], ext[1], ext[2], ext[3]);
    }


    public get minPos(): Position2d {
        return new Position2d(this.minLon, this.minLat);
    }


    public get maxPos(): Position2d {
        return new Position2d(this.maxLon, this.maxLat);
    }


    public clone(): Extent2d {
        return new Extent2d(this.minLon, this.minLat, this.maxLon, this.maxLat);
    }


    public getAsLatLon(): [number, number, number, number] {
        return this.getExtent();
    }


    public getAsMercator(): [number, number, number, number] {
        const arr = transformExtent(this.getExtent(), LONLAT_PROJECTION, MERCATOR_PROJECTION);

        return [arr[0], arr[1], arr[2], arr[3]];
    }


    public getMidPos(): Position2d {
        return new Position2d(
            (this.minLon + this.maxLon) / 2,
            (this.minLat + this.maxLat) / 2
        );
    }


    public getRadius(): Length {
        return GeodesyHelper.calcDistance(this.minPos, this.getMidPos());
    }


    public containsPoint2d(point: Position2d): boolean {
        return (this.minLon <= point.longitude
            && this.minLat <= point.latitude
            && this.maxLon >= point.longitude
            && this.maxLat >= point.latitude);
    }


    public containsExtent2d(extent: Extent2d): boolean {
        return (this.minLon <= extent.minLon
            && this.minLat <= extent.minLat
            && this.maxLon >= extent.maxLon
            && this.maxLat >= extent.maxLat);
    }


    public getOversizeExtent(factor: number): Extent2d {
        const halfDiffLon = (this.maxLon - this.minLon) / 2;
        const halfDiffLat = (this.maxLat - this.minLat) / 2;
        const centerLon = this.minLon + halfDiffLon;
        const centerLat = this.minLat + halfDiffLat;

        return new Extent2d(
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
