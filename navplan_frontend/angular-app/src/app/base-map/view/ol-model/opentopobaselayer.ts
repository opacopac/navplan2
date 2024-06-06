import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {OlBaseLayer} from './ol-base-layer';
import {MapBaseLayerType} from '../../domain/model/map-base-layer-type';


const MIN_ZOOM = 0;
const MAX_ZOOM = 17;
const BASE_URLS_OTM = ['//a.tile.opentopomap.org/', '//b.tile.opentopomap.org/', '//c.tile.opentopomap.org/'];
// const BASE_URLS_OTM = [ '//opentopomap.org/' ];
const BASE_URL_LOCAL = '//www.navplan.ch/maptiles/';

// const BASE_URL_LOCAL = 'maptiles/';


export class Opentopobaselayer {

    public static createBaseLayer(): OlBaseLayer {
        const layer = new TileLayer({
            source: new XYZ({
                tileUrlFunction: Opentopobaselayer.getTileUrl,
                minZoom: MIN_ZOOM,
                maxZoom: MAX_ZOOM,
                crossOrigin: null,
            })
        });

        return new OlBaseLayer(MapBaseLayerType.OPENTOPOMAP, layer);
    }

    private static getTileUrl(coordinate): string {
        const z = coordinate[0];
        const y = coordinate[1];
        const x = coordinate[2];

        if (Opentopobaselayer.isLocalTile(z, y, x)) {
            return BASE_URL_LOCAL + z + '/' + y + '/' + x + '.png';
        } else {
            const n = (z + y + x) % BASE_URLS_OTM.length;
            return BASE_URLS_OTM[n] + z + '/' + y + '/' + x + '.png';
        }
    }


    private static isLocalTile(z, y, x): boolean {
        if (z <= 6) {
            return true;
        }

        const zrange = [7, 14];
        const zoomfact = Math.pow(2, (z - 6));
        const yrange = [33 * zoomfact, 33 * zoomfact + zoomfact - 1];
        const xrange = [22 * zoomfact, 22 * zoomfact + zoomfact - 1];

        if (z < zrange[0] || z > zrange[1]) {
            return false;
        } else if (y < yrange[0] || y > yrange[1]) {
            return false;
        } else if (x < xrange[0] || x > xrange[1]) {
            return false;
        } else {
            return true;
        }
    }
}
