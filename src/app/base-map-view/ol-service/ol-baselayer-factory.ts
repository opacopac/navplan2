import {Osmbaselayer} from '../ol-model/osmbaselayer';
import {Opentopobaselayer} from '../ol-model/opentopobaselayer';
import {Mapboxbaselayer} from '../ol-model/mapboxbaselayer';
import {Mapzenbaselayer} from '../ol-model/mapzenbaselayer';
import {MapBaseLayerType} from '../../base-map/domain-model/map-base-layer-type';
import {SwisstopoImageBaselayer} from '../ol-model/swisstopo-image-baselayer';
import {SwisstopoPixcolBaselayer} from '../ol-model/swisstopo-pixcol-baselayer';
import {OlBaseLayer} from '../ol-model/ol-base-layer';
import {SwisstopoLightbaseBaselayer} from '../ol-model/swisstopo-lightbase-baselayer';


export class OlBaselayerFactory {
    public static create(layer: MapBaseLayerType): OlBaseLayer {
        const attributions = OlBaselayerFactory.getAttributions();

        switch (layer) {
            case MapBaseLayerType.OSM:
                return Osmbaselayer.createBaseLayer(attributions);
            case MapBaseLayerType.MAPBOX:
                return Mapboxbaselayer.createBaseLayer(attributions);
            case MapBaseLayerType.MAPZEN:
                return Mapzenbaselayer.createBaseLayer(attributions);
            case MapBaseLayerType.SWISSTOPO_LIGHTBASE:
                return SwisstopoLightbaseBaselayer.createBaseLayer(attributions);
            case MapBaseLayerType.SWISSTOPO_PIXCOL:
                return SwisstopoPixcolBaselayer.createBaseLayer(attributions);
            case MapBaseLayerType.SWISSTOPO_IMAGE:
                return SwisstopoImageBaselayer.createBaseLayer(attributions);
            case MapBaseLayerType.OPENTOPOMAP:
            default:
                return Opentopobaselayer.createBaseLayer(attributions);
        }
    }


    private static getAttributions(): string[] {
        return [
            'Map Data: &copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">(CC-BY-SA)</a>',
            'Elevation Data: <a href="https://lta.cr.usgs.gov/SRTM" target="_blank">SRTM</a>',
            'Map Visualization #1: <a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox</a>, <a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>',
            'Map Visualization #2: <a href="http://www.opentopomap.org/" target="_blank">OpenTopoMap</a> <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank">(CC-BY-SA)</a>',
            'Map Visualization #3: &copy; <a href="https://www.swisstopo.admin.ch/" target="_blank">swisstopo</a>',
            'Aviation Data: <a href="http://www.openaip.net/" target="_blank">openAIP</a> <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">(BY-NC-SA)</a>',
            'Traffic Data: <a href="http://wiki.glidernet.org/about" target="_blank">Open Glider Network</a> | <a href="http://www.ADSBexchange.com/" target="_blank">ADSBexchange</a>',
            'Aerodrome Charts: <a href="http://www.avare.ch/" target="_blank">Avare.ch</a>',
            'Weather Data: <a href="https://www.aviationweather.gov/" target="_blank">NOAA - Aviation Weather Center</a>',
            'NOTAM Data: <a href="https://www.icao.int/safety/iStars/pages/intro.aspx" target="_blank">ICAO - iSTARS API Data Service</a>',
            'Geographical Data: <a href="http://www.geonames.org/" target="_blank">GeoNames</a> <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank">(CC-BY)</a>',
            'Links to Webcams: all images are digital property of the webcam owners. check the reference for details.'
        ];
    }
}
