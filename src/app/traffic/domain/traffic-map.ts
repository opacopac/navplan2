import {Clonable} from '../../shared/model/clonable';
import {Traffic} from './traffic';
import {TrafficAddress} from './traffic-address';
import {IDate} from '../../shared/services/date/i-date';


export class TrafficMap implements Clonable<TrafficMap> {
    private map: Map<string, Traffic>;


    public static getKey(address: TrafficAddress): string {
        return address.type + '_' + address.value.toUpperCase();
    }


    constructor(private date: IDate) {
        this.map = new Map<string, Traffic>();
    }


    public get(key: string): Traffic | undefined {
        return this.map.get(key);
    }


    public set(key: string, traffic: Traffic): void {
        this.map.set(key, traffic);
    }


    public delete(key: string): boolean {
        return this.map.delete(key);
    }


    public clear(): void {
        this.map.clear();
    }


    public forEach(callbackfn: (value: Traffic, key: string) => void, thisArg?: any): void {
        return this.map.forEach(callbackfn, thisArg);
    }


    public keys(): IterableIterator<string> {
        return this.map.keys();
    }


    public values(): IterableIterator<Traffic> {
        return this.map.values();
    }


    public size(): number {
        return this.map.size;
    }


    public clone(): TrafficMap {
        const newTrafficMap = new TrafficMap(this.date);
        this.map.forEach((value, key) => newTrafficMap.map.set(key, this.map.get(key).clone()));

        return newTrafficMap;
    }


    public removeOutdatedTraffic(maxAgeSec: number): void {
        for (const trafficKey of Array.from(this.map.keys())) {
            const traffic = this.map.get(trafficKey);
            const oldestTimestampMs = this.date.now() - maxAgeSec * 1000;

            traffic.positions = traffic.positions.filter(pos => pos.position.timestamp.epochMs >= oldestTimestampMs);

            if (!traffic.hasPositions()) {
                this.delete(trafficKey);
            }
        }
    }
}
