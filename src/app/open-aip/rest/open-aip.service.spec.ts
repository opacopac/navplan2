import {TestBed, inject} from '@angular/core/testing';
import {OpenAipService} from './open-aip.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ReducerManager, ReducerManagerDispatcher, StoreModule} from '@ngrx/store';
import {OpenAipState} from '../domain/open-aip-state';
import {OpenAipActions} from '../ngrx/open-aip.actions';
import {openAipReducer} from '../ngrx/open-aip.reducer';


xdescribe('OpenAipService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OpenAipService,
                HttpClient,
                HttpHandler,
                ReducerManager,
                ReducerManagerDispatcher
            ],
            imports: [
                StoreModule.forFeature<OpenAipState, OpenAipActions>('openAipState', openAipReducer),
            ]
        });
    });

    it('should be created', inject([OpenAipService], (service: OpenAipService) => {
        expect(service).toBeTruthy();
    }));
});
