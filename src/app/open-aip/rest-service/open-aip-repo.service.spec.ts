import {inject, TestBed} from '@angular/core/testing';
import {OpenAipRepo} from './open-aip-repo.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ReducerManager, ReducerManagerDispatcher, StoreModule} from '@ngrx/store';
import {OpenAipState} from '../domain-model/open-aip-state';
import {OpenAipActions} from '../ngrx/open-aip.actions';
import {openAipReducer} from '../ngrx/open-aip.reducer';


xdescribe('OpenAipRepo', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OpenAipRepo,
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

    it('should be created', inject([OpenAipRepo], (service: OpenAipRepo) => {
        expect(service).toBeTruthy();
    }));
});
