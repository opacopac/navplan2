import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {fromLonLat, toLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import {Vector} from 'ol/source';


export class OlHelper {
    public static getMercator(pos: Position2d): [number, number] {
        const arr = fromLonLat(pos.toArray());

        return [arr[0], arr[1]];
    }


    public static getPosFromMercator(mercator: [number, number]): Position2d {
        const lonLat = toLonLat(mercator);

        return new Position2d(lonLat[0], lonLat[1]);
    }


    public static createEmptyVectorLayer(imageRenderMode: boolean = false): VectorLayer {
        return new VectorLayer({
            source: new Vector({}),
            renderMode: imageRenderMode ? 'image' : undefined
        });
    }
}
