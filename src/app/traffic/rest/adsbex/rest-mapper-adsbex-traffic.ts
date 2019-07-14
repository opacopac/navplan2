import {RestMapperTrafficPosition} from '../rest-mapper-traffic-position';
import {RestMapperTrafficAddress} from '../rest-mapper-traffic-address';
import {TrafficAdsbex} from '../../domain/traffic-adsbex';
import {IRestAdsbexTraffic} from './i-rest-adsbex-traffic';
import {TrafficDataSource} from '../../domain/traffic-data-source';


export class RestMapperAdsbexTraffic {
    public static fromRest(restTraffic: IRestAdsbexTraffic): TrafficAdsbex {
        return new TrafficAdsbex(
            RestMapperTrafficAddress.fromRest(restTraffic.addr),
            restTraffic.icaotype,
            restTraffic.reg,
            restTraffic.call,
            restTraffic.opicao,
            restTraffic.poslist.map(restPos => RestMapperTrafficPosition.fromRest(restPos, TrafficDataSource.ADSBX))
        );
    }
}
