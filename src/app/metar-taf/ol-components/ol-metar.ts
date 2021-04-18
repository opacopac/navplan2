import {OlMetarSky} from './ol-metar-sky';
import {OlMetarWind} from './ol-metar-wind';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {MetarTaf} from '../domain-model/metar-taf';
import {Position2d} from '../../geo-math/domain-model/geometry/position2d';
import {Angle} from '../../geo-math/domain-model/quantities/angle';
import VectorLayer from 'ol/layer/Vector';


export class OlMetar extends OlComponentBase {
    public readonly olMetarSky: OlMetarSky;
    public readonly olMetarWind: OlMetarWind;


    public constructor(
        metarTaf: MetarTaf,
        position: Position2d,
        mapRotation: Angle,
        layer: VectorLayer
    ) {
        super();

        this.olMetarSky = new OlMetarSky(metarTaf, position, layer);
        this.olMetarWind = new OlMetarWind(metarTaf, position, mapRotation, layer);
    }


    public get isSelectable(): boolean {
        return false;
    }
}
