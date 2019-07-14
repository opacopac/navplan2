import {Actions} from '@ngrx/effects';
import {of} from 'rxjs';
import {LoginEffects} from './login.effects';
import createSpyObj = jasmine.createSpyObj;
import {ClientstorageHelper} from '../../system/use-case/clientstorage/clientstorage-helper';
import {Router} from '@angular/router';
import {LogoutEffects} from './logout.effects';
import {LogoutUserAction} from './user.actions';
import {MessageService} from '../../message/services/message.service';


describe('LogoutEffects', () => {
    let router: jasmine.SpyObj<Router>;
    let clientStorageService: jasmine.SpyObj<ClientstorageHelper>;
    let messageService: jasmine.SpyObj<MessageService>;


    function createEffects(actions$: Actions): LogoutEffects {
        return new LogoutEffects(
            actions$,
            router,
            clientStorageService,
            messageService
        );
    }


    beforeEach(() => {
        router = createSpyObj<Router>('router', ['navigate']);
        clientStorageService = createSpyObj<ClientstorageHelper>('clientStorageService', ['deletePersistedToken']);
        messageService = createSpyObj<MessageService>('messageService', ['showSuccessMessage', 'showErrorMessage']);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    it('deletes the token cookie upon LogoutUserAction', async () => {
        const actions$ = new Actions(of(new LogoutUserAction()));

        const effects = createEffects(actions$);
        await effects.logoutUser$.subscribe();

        expect(clientStorageService.deletePersistedToken).toHaveBeenCalled();
    });


    it('navigates to the map upon LogoutUserAction', async () => {
        const actions$ = new Actions(of(new LogoutUserAction()));
        router.navigate.and.returnValue(of(true).toPromise());

        const effects = createEffects(actions$);
        await effects.logoutUser$.subscribe();

        expect(router.navigate).toHaveBeenCalledWith([LoginEffects.ROUTE_URL_MAP]);
    });


    it('shows a logout message upon LogoutUserAction', async () => {
        const actions$ = new Actions(of(new LogoutUserAction()));

        const effects = createEffects(actions$);
        await effects.logoutUser$.subscribe();

        expect(messageService.showSuccessMessage).toHaveBeenCalled();
    });
});
