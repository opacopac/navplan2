import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import {MessageService} from '../../message/domain-service/message.service';
import {OpenAipEffects} from './open-aip.effects';
import {OpenAipService} from '../domain-service/open-aip-service';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ReadOpenAipItemsAction, ReadOpenAipItemsErrorAction, ReadOpenAipItemsSuccessAction} from './open-aip.actions';
import {ReadOpenAipItemsByExtentResult} from '../domain-model/read-open-aip-items-by-extent-result';
import {MockStore} from '../../common/test/mock-store';
import {OpenAipState} from '../domain-model/open-aip-state';
import createSpyObj = jasmine.createSpyObj;


describe('OpenAipEffects', () => {
    let zoom: number;
    let extent: Extent2d;
    let openAipResult: ReadOpenAipItemsByExtentResult;
    let errorText: string;
    let error: Error;
    let initialState: OpenAipState;
    let store: MockStore;
    let openAipRepo: jasmine.SpyObj<OpenAipService>;
    let messageService: jasmine.SpyObj<MessageService>;


    function createEffects(actions$: Actions): OpenAipEffects {
        return new OpenAipEffects(actions$, store, openAipRepo, messageService);
    }


    beforeEach(() => {
        extent = new Extent2d(7.0, 47.0, 8.0, 48.0);
        zoom = 11;
        openAipResult = new ReadOpenAipItemsByExtentResult(extent, zoom, undefined, 0);
        errorText = 'MEEP';
        error = new Error(errorText);
        initialState = { extent: undefined, zoom: undefined, openAipItems: undefined, timestampMs: 0 };
        store = new MockStore('openAipState', initialState);
        openAipRepo = createSpyObj<OpenAipService>('openAipRepo', ['readByExtent']);
        messageService = createSpyObj<MessageService>('messageService', ['showSuccessMessage', 'showErrorMessage']);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    it('reads openAIP items from openAIP repo upon ReadOpenAipItemsAction', async () => {
        const actions$ = new Actions(of(new ReadOpenAipItemsAction(extent, zoom)));
        openAipRepo.readByExtent.and.returnValue(of(openAipResult));

        const effects = createEffects(actions$);
        await effects.readOpenAipItemsAction$.subscribe();

        expect(openAipRepo.readByExtent).toHaveBeenCalledWith(extent, zoom, initialState);
    });


    it('sends a ReadOpenAipItemsSuccessAction upon ReadOpenAipItemsAction in success case', async (done) => {
        const actions$ = new Actions(of(new ReadOpenAipItemsAction(extent, zoom)));
        openAipRepo.readByExtent.and.returnValue(of(openAipResult));

        const effects = createEffects(actions$);
        await effects.readOpenAipItemsAction$.subscribe(action => {
            expect(action).toEqual(new ReadOpenAipItemsSuccessAction(openAipResult));
            done();
        });
    });


    it('sends a ReadOpenAipItemsErrorAction upon ReadOpenAipItemsAction in error case', async (done) => {
        const actions$ = new Actions(of(new ReadOpenAipItemsAction(extent, zoom)));
        openAipRepo.readByExtent.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.readOpenAipItemsAction$.subscribe(action => {
            expect(action).toEqual(new ReadOpenAipItemsErrorAction(error));
            done();
        });
    });


    it('shows a error message upon ReadOpenAipItemsErrorAction', async () => {
        const actions$ = new Actions(of(new ReadOpenAipItemsErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.readOpenAipItemsErrorAction$.subscribe();

        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });
});
