import {TrafficDetailsServiceMock} from '../../mocks/traffic-details-service.mock';
import {TrafficDetailsReader} from './traffic-details-reader';
import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {TrafficMap} from '../../domain/traffic-map';
import {of} from 'rxjs';
import {TrafficAdsbex1Mock} from '../../mocks/traffic-adsbex1.mock';
import {MockDate} from '../../../shared/services/date/mock-date';


describe('TrafficDetailsReader', () => {
    let mockDate: MockDate;
    let service: TrafficDetailsServiceMock;
    let trafficMap: TrafficMap;


    beforeEach(() => {
        mockDate = new MockDate();
        service = new TrafficDetailsServiceMock();
        trafficMap = new TrafficMap(mockDate);
    });


    it('creates an instance', () => {
        const reader = new TrafficDetailsReader(service);

        expect(reader).toBeDefined();
    });


    it('readTraffic calls traffic service for traffic which details havent been loaded yet', () => {
        const ac1 = TrafficAdsbex1Mock.createTraffic();
        ac1.isDetailsLoaded = false;
        const ac2 = TrafficDetails1Mock.createTraffic();
        ac2.isDetailsLoaded = true;
        const key1 = TrafficMap.getKey(ac1.address);
        const key2 = TrafficMap.getKey(ac2.address);
        trafficMap.set(key1, ac1);
        trafficMap.set(key2, ac2);
        const reader = new TrafficDetailsReader(service);
        service.readDetailsResult = of([TrafficDetails1Mock.create()]);

        const promise = reader.read(trafficMap);

        expect(promise).toBeDefined();
        expect(service.readDetailsArgs.trafficList.length).toEqual(1);
        expect(service.readDetailsArgs.trafficList[0]).toEqual(ac1);
    });


    it('readTraffic doesnt calls traffic service if all traffic details have been loaded already', () => {
        const ac = TrafficDetails1Mock.createTraffic();
        ac.isDetailsLoaded = true;
        const key = TrafficMap.getKey(ac.address);
        trafficMap.set(key, ac);
        const reader = new TrafficDetailsReader(service);

        const promise = reader.read(trafficMap);

        expect(promise).toBeDefined();
        expect(service.readDetailsArgs.trafficList).toBeUndefined();
    });
});
