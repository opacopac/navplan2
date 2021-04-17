import {Vector} from 'ol/source';
import {OlMetarSky} from './ol-metar-sky';
import {OlMetarWind} from './ol-metar-wind';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {MetarTaf} from '../domain-model/metar-taf';
import {Position2d} from '../../geo-math/domain-model/geometry/position2d';
import {Angle} from '../../geo-math/domain-model/quantities/angle';


export class OlMetar extends OlComponentBase {
    private readonly olMetarSky: OlMetarSky;
    private readonly olMetarWind: OlMetarWind;


    public constructor(
        metarTaf: MetarTaf,
        position: Position2d,
        mapRotation: Angle,
        source: Vector) {

        super();

        this.olMetarSky = new OlMetarSky(metarTaf, position, source);
        this.olMetarWind = new OlMetarWind(metarTaf, position, mapRotation, source);
    }


    public get isSelectable(): boolean {
        return false;
    }
}
