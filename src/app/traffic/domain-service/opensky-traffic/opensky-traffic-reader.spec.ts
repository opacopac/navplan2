/*import {Extent4dMock} from '../../mocks/extent4d.mock';
import {OpenskyTrafficTerviceMock} from '../../mocks/opensky-traffic-tervice.mock';


describe('OpenskyTrafficReader', () => {
    let service: OpenskyTrafficTerviceMock;


    beforeEach(() => {
        service = new OpenskyTrafficTerviceMock();
    });


    it('creates an instance', () => {
        const reader = new OpenskyTrafficReader(service);

        expect(reader).toBeDefined();
    });


    it('readTraffic calls traffic service', () => {
        const reader = new OpenskyTrafficReader(service);
        const extent = Extent4dMock.create();

        reader.read(extent);

        expect(reader).toBeDefined();
        expect(service.readTrafficArgs.extent).toEqual(extent);
    });
});
*/
