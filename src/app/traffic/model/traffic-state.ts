import {TrafficServiceStatus} from '../services/traffic.service';
import {Traffic} from './traffic';


export interface TrafficState {
    isWatching: boolean;
    status: TrafficServiceStatus;
    trafficList: Traffic[];
}
