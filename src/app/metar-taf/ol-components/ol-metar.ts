import * as ol from 'openlayers';
import {OlMetarSky} from './ol-metar-sky';
import {OlMetarWind} from './ol-metar-wind';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MetarTaf} from '../model/metar-taf';
import {Position2d} from '../../shared/model/geometry/position2d';
import {Angle} from '../../shared/model/quantities/angle';


export class OlMetar extends OlComponent {
    private readonly olMetarSky: OlMetarSky;
    private readonly olMetarWind: OlMetarWind;


    public constructor(
        metarTaf: MetarTaf,
        position: Position2d,
        mapRotation: Angle,
        source: ol.source.Vector) {

        super();

        this.olMetarSky = new OlMetarSky(metarTaf, position, source);
        this.olMetarWind = new OlMetarWind(metarTaf, position, mapRotation, source);
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.olMetarSky.destroy();
        this.olMetarWind.destroy();
    }
}
