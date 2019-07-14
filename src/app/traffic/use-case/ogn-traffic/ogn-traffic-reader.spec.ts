/*import {Extent4dMock} from '../../mocks/extent4d.mock';
import {OgnTrafficTerviceMock} from '../../mocks/ogn-traffic-tervice.mock';


describe('OgnTrafficReader', () => {
    let service: OgnTrafficTerviceMock;


    beforeEach(() => {
        service = new OgnTrafficTerviceMock();
    });


    it('creates an instance', () => {
        const reader = new OgnTrafficReader(service);

        expect(reader).toBeDefined();
    });


    it('readTraffic calls traffic service', () => {
        const reader = new OgnTrafficReader(service);
        const extent = Extent4dMock.create();
        const sessionId = '123456';
        const maxAgeSec = 120;

        reader.read(extent, sessionId, maxAgeSec);

        expect(reader).toBeDefined();
        expect(service.readTrafficArgs.extent).toEqual(extent);
        expect(service.readTrafficArgs.sessionId).toEqual(sessionId);
        expect(service.readTrafficArgs.maxAgeSec).toEqual(maxAgeSec);
    });
});
*/
