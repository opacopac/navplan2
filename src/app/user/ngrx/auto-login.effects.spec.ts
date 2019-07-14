import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import {UserService} from '../rest/user.service';
import {LoginEffects} from './login.effects';
import {AutoLoginUserAction, AutoLoginUserErrorAction, AutoLoginUserSuccessAction} from './user.actions';
import {User} from '../domain/user';
import {ClientstorageHelper} from '../../system/use-case/clientstorage/clientstorage-helper';
import {Router} from '@angular/router';
import {AutoLoginEffects} from './auto-login.effects';
import createSpyObj = jasmine.createSpyObj;
import {MessageService} from '../../message/services/message.service';


describe('AutoLoginEffects', () => {
    let token, email, errorText: string;
    let user: User;
    let error: Error;
    let router: jasmine.SpyObj<Router>;
    let clientStorageService: jasmine.SpyObj<ClientstorageHelper>;
    let userService: jasmine.SpyObj<UserService>;
    let messageService: jasmine.SpyObj<MessageService>;


    function createEffects(actions$: Actions): AutoLoginEffects {
        return new AutoLoginEffects(
            actions$,
            router,
            clientStorageService,
            userService,
            messageService
        );
    }


    beforeEach(() => {
        token = '123456';
        email = 'test@navplan.ch';
        user = new User(email, token);
        errorText = 'MEEP2';
        error = new Error(errorText);
        router = createSpyObj<Router>('router', ['navigate']);
        clientStorageService = createSpyObj<ClientstorageHelper>('clientStorageService', ['deletePersistedToken']);
        userService = createSpyObj<UserService>('userService', ['autoLogin']);
        messageService = createSpyObj<MessageService>('messageService', ['showSuccessMessage', 'showErrorMessage']);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    it('calls userService.autoLogin upon AutoLoginUserAction', async () => {
        const actions$ = new Actions(of(new AutoLoginUserAction(token)));
        userService.autoLogin.and.returnValue(of(user));

        const effects = createEffects(actions$);
        await effects.autoLoginUser$.subscribe();

        expect(userService.autoLogin).toHaveBeenCalledWith(token);
    });


    it('sends a AutoLoginUserSuccessAction upon AutoLoginUserAction in success case', async (done) => {
        const actions$ = new Actions(of(new AutoLoginUserAction(token)));
        userService.autoLogin.and.returnValue(of(user));

        const effects = createEffects(actions$);
        await effects.autoLoginUser$.subscribe((action) => {
            expect(action).toEqual(new AutoLoginUserSuccessAction(user));
            done();
        });
    });


    it('sends a AutoLoginUserErrorAction upon AutoLoginUserAction in error case', async (done) => {
        const actions$ = new Actions(of(new AutoLoginUserAction(token)));
        userService.autoLogin.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.autoLoginUser$.subscribe((action) => {
            expect(action).toEqual(new AutoLoginUserErrorAction(error));
            done();
        });
    });



    it('navigates to the map view upon AutoLoginUserSuccessAction', async () => {
        const actions$ = new Actions(of(new AutoLoginUserSuccessAction(user)));
        router.navigate.and.returnValue(of(true).toPromise());

        const effects = createEffects(actions$);
        await effects.autoLoginUserSuccess$.subscribe();

        expect(router.navigate).toHaveBeenCalledWith([LoginEffects.ROUTE_URL_MAP]);
    });


    it('shows a success message upon AutoLoginUserSuccessAction', async () => {
        const actions$ = new Actions(of(new AutoLoginUserSuccessAction(user)));

        const effects = createEffects(actions$);
        await effects.autoLoginUserSuccess$.subscribe();

        expect(messageService.showSuccessMessage).toHaveBeenCalled();
    });


    it('deletes the token cookie upon AutoLoginUserErrorAction', async() => {
        const actions$ = new Actions(of(new AutoLoginUserErrorAction(error)));
        clientStorageService.deletePersistedToken.and.returnValue(undefined);

        const effects = createEffects(actions$);
        await effects.autoLoginUserError$.subscribe();

        expect(clientStorageService.deletePersistedToken).toHaveBeenCalled();
    });
});
