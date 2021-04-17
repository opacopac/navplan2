import {inject, TestBed} from '@angular/core/testing';
import {NotamRepoService} from './notam-repo.service';


xdescribe('NotamService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotamRepoService]
        });
    });

    it('should be created', inject([NotamRepoService], (service: NotamRepoService) => {
        expect(service).toBeTruthy();
    }));
});
