import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {fromLonLat, toLonLat, transformExtent} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import {Vector} from 'ol/source';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';

const MERCATOR_PROJECTION = 'EPSG:3857';
const LONLAT_PROJECTION = 'EPSG:4326';


export class OlHelper {
    public static getMercator(pos: Position2d): [number, number] {
        const arr = fromLonLat(pos.toArray());

        return [arr[0], arr[1]];
    }


    public static getPosFromMercator(mercator: [number, number]): Position2d {
        const lonLat = toLonLat(mercator);

        return new Position2d(lonLat[0], lonLat[1]);
    }


    public static getExtentFromMercator(extent: [number, number, number, number]): Extent2d {
        const ext = transformExtent(extent, MERCATOR_PROJECTION, LONLAT_PROJECTION);
        return new Extent2d(ext[0], ext[1], ext[2], ext[3]);
    }


    public static getExtentAsMercator(extent: Extent2d): [number, number, number, number] {
        const arr = transformExtent(
            [extent.minLon, extent.minLat, extent.maxLon, extent.maxLat],
            LONLAT_PROJECTION,
            MERCATOR_PROJECTION
        );

        return [arr[0], arr[1], arr[2], arr[3]];
    }


    public static createEmptyVectorLayer(imageRenderMode: boolean = false): VectorLayer {
        return new VectorLayer({
            source: new Vector({}),
            renderMode: imageRenderMode ? 'image' : undefined
        });
    }
}
