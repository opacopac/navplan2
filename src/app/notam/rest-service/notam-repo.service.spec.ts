import {inject, TestBed} from '@angular/core/testing';
import {RestNotamRepo} from './rest-notam-repo.service';


xdescribe('NotamService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RestNotamRepo]
        });
    });

    it('should be created', inject([RestNotamRepo], (service: RestNotamRepo) => {
        expect(service).toBeTruthy();
    }));
});
