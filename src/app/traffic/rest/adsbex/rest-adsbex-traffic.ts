import {RestTrafficPosition} from '../rest-traffic-position';
import {RestTrafficAddress} from '../rest-traffic-address';
import {TrafficAdsbex} from '../../domain/traffic-adsbex';
import {IRestAdsbexTraffic} from './i-rest-adsbex-traffic';
import {TrafficDataSource} from '../../domain/traffic-data-source';


export class RestAdsbexTraffic {
    public static fromRest(restTraffic: IRestAdsbexTraffic): TrafficAdsbex {
        return new TrafficAdsbex(
            RestTrafficAddress.fromRest(restTraffic.addr),
            restTraffic.icaotype,
            restTraffic.reg,
            restTraffic.call,
            restTraffic.opicao,
            restTraffic.poslist.map(restPos => RestTrafficPosition.fromRest(restPos, TrafficDataSource.ADSBX))
        );
    }
}
