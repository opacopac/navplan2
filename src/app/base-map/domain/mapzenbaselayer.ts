import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const MIN_ZOOM = 0;
const MAX_ZOOM = 17;
const BASE_URL = 'https://tile.mapzen.com/mapzen/terrain/v1/normal/';
const API_KEY = 'mapzen-ECzH36f';


export class Mapzenbaselayer {

    public static createBaseLayer(attributions: string[]): TileLayer {
        const layer = new TileLayer({
            source: new XYZ({
                tileUrlFunction: Mapzenbaselayer.getTileUrl,
                minZoom: MIN_ZOOM,
                maxZoom: MAX_ZOOM,
                crossOrigin: null,
                attributions: attributions
            })
        });

        return layer;
    }


    private static getTileUrl(coordinate): string {
        const z = coordinate[0];
        const y = coordinate[1];
        const x = (-coordinate[2] - 1);

        return BASE_URL + z + '/' + y + '/' + x + '.png?api_key=' + API_KEY;
    }
}
