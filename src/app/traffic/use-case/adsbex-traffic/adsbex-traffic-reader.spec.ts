import {AdsbexTrafficReader} from './adsbex-traffic-reader';
import {AdsbexTrafficTerviceMock} from '../../mocks/adsbex-traffic-tervice.mock';
import {Extent4dMock} from '../../mocks/extent4d.mock';


describe('AdsbexTrafficReader', () => {
    let service: AdsbexTrafficTerviceMock;


    beforeEach(() => {
        service = new AdsbexTrafficTerviceMock();
    });


    it('creates an instance', () => {
        const reader = new AdsbexTrafficReader(service);

        expect(reader).toBeDefined();
    });


    it('readTraffic calls traffic service', () => {
        const reader = new AdsbexTrafficReader(service);
        const extent = Extent4dMock.create();

        reader.read(extent);

        expect(reader).toBeDefined();
        expect(service.readTrafficArgs.extent).toEqual(extent);
    });
});
