import {Osmbaselayer} from './osmbaselayer';
import {Opentopobaselayer} from './opentopobaselayer';
import {Mapboxbaselayer} from './mapboxbaselayer';
import {Mapzenbaselayer} from './mapzenbaselayer';
import TileLayer from 'ol/layer/Tile';


export enum MapbaselayerType {
    OPENTOPOMAP,
    MAPZEN,
    MAPBOX,
    OSM
}


export class OlBaselayerFactory {
    public static create(layer: MapbaselayerType): TileLayer {
        const attributions = OlBaselayerFactory.getAttributions();

        switch (layer) {
            case MapbaselayerType.OSM:
                return Osmbaselayer.createBaseLayer(attributions);
            case MapbaselayerType.MAPBOX:
                return Mapboxbaselayer.createBaseLayer(attributions);
            case MapbaselayerType.MAPZEN:
                return Mapzenbaselayer.createBaseLayer(attributions);
            case MapbaselayerType.OPENTOPOMAP:
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
