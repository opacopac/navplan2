import {inject, TestBed} from '@angular/core/testing';
import {TrackService} from './track.service';


xdescribe('TrackService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TrackService]
        });
    });

    it('should be created', inject([TrackService], (service: TrackService) => {
        expect(service).toBeTruthy();
    }));
});
