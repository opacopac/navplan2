import {TrafficTimerService} from './traffic-timer.service';
import {MockStore} from '../../shared/test/mock-store';


describe('TrafficTimerService', () => {
    let store: MockStore;


    beforeEach((done) => {
        store = new MockStore({});
        store.setState({ trafficState: { isWatching: true }});

        setTimeout(() => done(), 1);
    });


    it('should be created', () => {
        const ttService = new TrafficTimerService(store, 10);
        expect(ttService).toBeTruthy();
    });


    it('regularly dispatches ReadTrafficTimerActions after starting', (done) => {
        const ttService = new TrafficTimerService(store, 10);
        ttService.start();

        setTimeout(() => {
            expect(store.dispatchCallCount).toBeGreaterThan(3);
            ttService.stop();
            done();
        }, 50);
    });


    it('stops dispatching ReadTrafficTimerActions after stopping', (done) => {
        const ttService = new TrafficTimerService(store, 10);
        ttService.start();
        setTimeout(() => ttService.stop(), 1);

        setTimeout(() => {
            expect(store.dispatchCallCount).toBe(1);
            done();
        }, 50);
    });


    it('restarts dispatching ReadTrafficTimerActions after start-stop-start', (done) => {
        const ttService = new TrafficTimerService(store, 10);
        ttService.start();
        setTimeout(() => ttService.stop(), 1);
        setTimeout(() => ttService.start(), 10);

        setTimeout(() => {
            expect(store.dispatchCallCount).toBeGreaterThan(3);
            ttService.stop();
            done();
        }, 50);
    });


    it('does NOT dispatch ReadTrafficTimerActions after starting while not watching', (done) => {
        store.setState({ trafficState: { isWatching: false }});
        const ttService = new TrafficTimerService(store, 10);
        ttService.start();

        setTimeout(() => {
            expect(store.dispatchCallCount).toBe(0);
            ttService.stop();
            done();
        }, 50);
    });
});
