import * as ol from 'openlayers';

const MIN_ZOOM = 0;
const MAX_ZOOM = 17;
const BASE_URL = 'https://api.mapbox.com/styles/v1/opacopac/cj0mxdtd800bx2slaha4b0p68/tiles/256/';
const ACCESS_TOKEN_NAVPLAN = 'pk.eyJ1Ijoib3BhY29wYWMiLCJhIjoiY2oxYjdkOXpzMDA2dTMycGV3ZDlkM3R2NyJ9.paBLy_T8QJLELJd8VAAEIw';
const ACCESS_TOKEN_NAVPLAN_BRANCH = 'pk.eyJ1Ijoib3BhY29wYWMiLCJhIjoiY2oxYjZ6aDQxMDA1ejJ3cGUzbmZ1Zm81eiJ9.oFvbw05OkuQesxOghWqv_A';


export class Mapboxbaselayer {

    public static createBaseLayer(attributions: string[]): ol.layer.Layer {
        const layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                tileUrlFunction: Mapboxbaselayer.getTileUrl,
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

        return BASE_URL + z + '/' + y + '/' + x + '@2x?access_token=' + ACCESS_TOKEN_NAVPLAN;
    }
}
