import {Flightroute} from './flightroute';


describe('Flightroute Class', () => {
    let route1: Flightroute;
    beforeEach(() => {
        route1 = new Flightroute(
            1,
            'title',
            'comments',
            undefined,
            [],
            undefined,
            undefined
        );

    });

    it('creates an instance', () => {
        // expect(route1).toBeDefined();
    });
});
