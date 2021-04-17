import {TrafficAddressType} from '../domain-model/traffic-address-type';
import {TrafficAddress} from '../domain-model/traffic-address';
import {TrafficDetails} from '../domain-model/traffic-details';
import {IRestTrafficDetails} from '../rest/traffic-details/i-rest-traffic-details';
import {IRestTrafficDetailsResponse} from '../rest/traffic-details/i-rest-traffic-details-response';
import {IRestTrafficDetailsRequestItem} from '../rest/traffic-details/i-rest-traffic-details-request-item';
import {IRestTrafficDetailsRequest} from '../rest/traffic-details/i-rest-traffic-details-request';
import {Traffic} from '../domain-model/traffic';
import {TrafficAircraftType} from '../domain-model/traffic-aircraft-type';


export class TrafficDetails1Mock {
    public static createRestResponse(): IRestTrafficDetailsResponse {
        return {
            aclist: [this.createRest()]
        };
    }


    public static createRestRequest(): IRestTrafficDetailsRequest {
        return {
            action: 'readtrafficdetails',
            aclist: [this.createRestRequestItem()]
        };
    }


    public static create(): TrafficDetails {
        return new TrafficDetails(
            new TrafficAddress('4B3142', TrafficAddressType.ICAO),
            'HB-SRA',
            'AT-3 R100',
            'AERO AT SP. Z O.O.',
            'AAT3',
            'L',
            'P'
        );
    }


    public static createTraffic(): Traffic {
        const ac = new Traffic(
            new TrafficAddress('4B3142', TrafficAddressType.ICAO),
            TrafficAircraftType.POWERED_AIRCRAFT,
            'AAT3',
            'HB-SRA',
            undefined,
            undefined,
            undefined,
            'AT-3 R100',
            []
        );
        ac.isDetailsLoaded = true;

        return ac;
    }


    public static createRest(): IRestTrafficDetails {
        return {
            addr: ['4B3142', 'ICAO'],
            reg: 'HB-SRA',
            model: 'AT-3 R100',
            manufacturer: 'AERO AT SP. Z O.O.',
            ac_type: 'AAT3',
            ac_class: 'L',
            eng_class: 'P'
        };
    }


    public static createRestRequestItem(): IRestTrafficDetailsRequestItem {
        return {
            addr: ['4B3142', 'ICAO'],
            ac_type: 'AAT3',
        };
    }
}
