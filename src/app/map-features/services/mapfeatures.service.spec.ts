import {TestBed, inject} from '@angular/core/testing';
import {MapfeaturesService} from './mapfeatures.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ReducerManager, ReducerManagerDispatcher, StoreModule} from '@ngrx/store';
import {MapFeaturesState} from '../map-features-state';
import {MapFeaturesActions} from '../map-features.actions';
import {mapFeaturesReducer} from '../map-features.reducer';


xdescribe('MapfeaturesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MapfeaturesService,
                HttpClient,
                HttpHandler,
                ReducerManager,
                ReducerManagerDispatcher
            ],
            imports: [
                StoreModule.forFeature<MapFeaturesState, MapFeaturesActions>('mapFeaturesState', mapFeaturesReducer),
            ]
        });
    });

    it('should be created', inject([MapfeaturesService], (service: MapfeaturesService) => {
        expect(service).toBeTruthy();
    }));
});
