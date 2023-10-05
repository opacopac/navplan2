import {inject, TestBed} from '@angular/core/testing';
import {RestUserService} from './rest-user.service';


xdescribe('RestUserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RestUserService]
        });
    });

    it('should be created', inject([RestUserService], (service: RestUserService) => {
        expect(service).toBeTruthy();
    }));
});
