import {OlMetarSky} from './ol-metar-sky';
import {OlMetarWind} from './ol-metar-wind';
import {MetarTaf} from '../domain-model/metar-taf';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import VectorLayer from 'ol/layer/Vector';


export class OlMetar {
    public readonly olMetarSky: OlMetarSky;
    public readonly olMetarWind: OlMetarWind;


    public constructor(
        metarTaf: MetarTaf,
        position: Position2d,
        mapRotation: Angle,
        layer: VectorLayer
    ) {
        this.olMetarSky = new OlMetarSky(metarTaf, position, layer);
        this.olMetarWind = new OlMetarWind(metarTaf, position, mapRotation, layer);
    }
}
