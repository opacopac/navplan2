import * as ol from 'openlayers';


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


    public getAsLatLon(): [number, number, number, number] {
        return this.getExtent();
    }


    public getAsMercator(): [number, number, number, number] {
        return ol.proj.transformExtent(this.getExtent(), LONLAT_PROJECTION, MERCATOR_PROJECTION);
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
