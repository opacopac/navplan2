import {TestBed, inject} from '@angular/core/testing';
import {IcaoCallsignService} from './icaocallsign.service';


xdescribe('IcaoCallsignService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IcaoCallsignService]
        });
    });

    it('should be created', inject([IcaoCallsignService], (service: IcaoCallsignService) => {
        expect(service).toBeTruthy();
    }));
});
