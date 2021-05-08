import {Position2d} from './position2d';
import {GeodesyHelper} from '../../domain-service/geodesy-helper';
import {Length} from '../quantities/length';
import {Clonable} from '../../../../system/domain-model/clonable';


export class Extent2d implements Clonable<Extent2d> {
    public constructor(
        public minLon: number,
        public minLat: number,
        public maxLon: number,
        public maxLat: number
    ) {
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
