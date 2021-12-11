import {RestTrafficPositionConverter} from '../rest-traffic-position-converter';
import {RestTrafficAddressConverter} from '../rest-traffic-address-converter';
import {AdsbexTraffic} from '../../../traffic/domain-model/adsbex-traffic';
import {IRestAdsbexTraffic} from './i-rest-adsbex-traffic';
import {TrafficDataSource} from '../../../traffic/domain-model/traffic-data-source';


export class RestAdsbexTrafficConverter {
    public static fromRest(restTraffic: IRestAdsbexTraffic): AdsbexTraffic {
        return new AdsbexTraffic(
            RestTrafficAddressConverter.fromRest(restTraffic.addr),
            restTraffic.icaotype,
            restTraffic.reg,
            restTraffic.call,
            restTraffic.opicao,
            restTraffic.poslist.map(restPos => RestTrafficPositionConverter.fromRest(restPos, TrafficDataSource.ADSBX))
        );
    }
}
