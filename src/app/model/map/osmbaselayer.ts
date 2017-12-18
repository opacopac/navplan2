import * as ol from 'openlayers';


export class Osmbaselayer {
    static createBaseLayer(attributions: string[]): ol.layer.Layer {
        const layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attributions: attributions
            })
        });

        return layer;
    }
}
