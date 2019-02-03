import {Position4d} from '../../shared/model/geometry/position4d';
import {Altitude} from '../../shared/model/quantities/altitude';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {LengthUnit} from '../../shared/model/units';
import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';


export interface TrafficOgnResponse {
    aclist: {
        [key: string]: TrafficOgnRestItem
    };
}


export interface TrafficOgnRestItem {
    id: string;
    addresstype: string;
    actype: string;
    positions: TrafficOgnPositionRestItem[];
    registration: string;
    aircraftModelType: string;
    aircraftCategoryId: number;
}


export interface TrafficOgnPositionRestItem {
    latitude: number;
    longitude: number;
    altitude: number;
    time: string;
    receiver: string;
}


export class RestMapperTrafficOgn {
    public static getTrafficListFromResponse(response: TrafficOgnResponse): Traffic[] {
        const trafficList: Traffic[] = [];

        for (const acAddress of Object.keys(response.aclist)) {
            const ac: TrafficOgnRestItem = response.aclist[acAddress];
            const traffic = new Traffic(
                ac.id.toUpperCase(),
                TrafficAddressType[ac.addresstype],
                TrafficDataSource.OGN,
                TrafficAircraftType[ac.actype],
                ac.registration,
                undefined,
                undefined,
                ac.aircraftModelType,
                this.getTrafficPositions(ac.positions));
            trafficList.push(traffic);
        }

        return trafficList;
    }


    private static getTrafficPositions(acPosList: TrafficOgnPositionRestItem[]): TrafficPosition[] {
        const positionList: TrafficPosition[] = [];

        for (const acPos of acPosList) {
            const position = new TrafficPosition(
                new Position4d(
                    acPos.longitude,
                    acPos.latitude,
                    new Altitude(acPos.altitude, LengthUnit.M),
                    Timestamp.createFromSec(this.getEpocSecFromOgnTime(acPos.time))
                ),
                TrafficDataSource.OGN,
                TrafficPositionMethod.FLARM,
                'Open Glider Network (' + acPos.receiver + ')',
                Date.now()
            );
            positionList.push(position);
        }

        return positionList;
    }


    private static getEpocSecFromOgnTime(timeString: string): number {
        const timeParts = timeString.split(':', 3);
        const now = new Date();
        const epocMs = Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            parseInt(timeParts[0], 10),
            parseInt(timeParts[1], 10),
            parseInt(timeParts[2], 10));
        return Math.floor(Math.min(epocMs, now.getTime()) / 1000);
    }
}
