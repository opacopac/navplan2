import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import {LoginEffects} from './login.effects';
import {ClientstorageHelper} from '../../system/domain-service/clientstorage/clientstorage-helper';
import {Router} from '@angular/router';
import {User} from '../domain-model/user';
import {LoginUserAction, LoginUserErrorAction, LoginUserSuccessAction} from './user.actions';
import {MessageService} from '../../message/domain-service/message.service';
import {UserService} from '../domain-service/user.service';
import createSpyObj = jasmine.createSpyObj;


describe('LoginEffects', () => {
    let token, email, pw, errorText: string;
    let rememberMe: boolean;
    let user: User;
    let error: Error;
    let router: jasmine.SpyObj<Router>;
    let clientStorageService: jasmine.SpyObj<ClientstorageHelper>;
    let userService: jasmine.SpyObj<UserService>;
    let messageService: jasmine.SpyObj<MessageService>;

    function createEffects(actions$: Actions): LoginEffects {
        return new LoginEffects(
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
        pw = '012345';
        user = new User(email, token);
        rememberMe = false;
        errorText = 'MEEP';
        error = new Error(errorText);
        router = createSpyObj<Router>('router', ['navigate']);
        clientStorageService = createSpyObj<ClientstorageHelper>('clientStorageService', ['persistToken', 'deletePersistedToken']);
        userService = createSpyObj<UserService>('userService', ['login']);
        messageService = createSpyObj<MessageService>('messageService', ['showSuccessMessage', 'showErrorMessage']);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    it('calls userService.login upon LoginUserAction', async() => {
        const actions$ = new Actions(of(new LoginUserAction(email, pw, rememberMe)));
        userService.login.and.returnValue(of(user));

        const effects = createEffects(actions$);
        await effects.loginUser$.subscribe();

        expect(userService.login).toHaveBeenCalledWith(email, pw, rememberMe);
    });


    it('sends a LoginUserSuccessAction upon LoginUserAction in success case', async (done) => {
        const actions$ = new Actions(of(new LoginUserAction(email, pw, rememberMe)));
        userService.login.and.returnValue(of(user));

        const effects = createEffects(actions$);
        await effects.loginUser$.subscribe((action) => {
            expect(action).toEqual(new LoginUserSuccessAction(user, rememberMe));
            done();
        });
    });


    it('sends a LoginUserErrorAction upon LoginUserAction in error case', async (done) => {
        const actions$ = new Actions(of(new LoginUserAction(email, pw, rememberMe)));
        userService.login.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.loginUser$.subscribe((action) => {
            expect(action).toEqual(new LoginUserErrorAction(error));
            done();
        });
    });


    it('navigates to the map upon LoginUserSuccessAction', async() => {
        const actions$ = new Actions(of(new LoginUserSuccessAction(user, rememberMe)));
        router.navigate.and.returnValue(of(true).toPromise());

        const effects = createEffects(actions$);
        await effects.loginUserSuccess$.subscribe();

        expect(router.navigate).toHaveBeenCalledWith([LoginEffects.ROUTE_URL_MAP]);
    });


    it('sets the token cookie upon LoginUserSuccessAction', async() => {
        const actions$ = new Actions(of(new LoginUserSuccessAction(user, rememberMe)));

        const effects = createEffects(actions$);
        await effects.loginUserSuccess$.subscribe();

        expect(clientStorageService.persistToken).toHaveBeenCalledWith(token, rememberMe);
    });


    it('shows a success message upon LoginUserSuccessAction', async() => {
        const actions$ = new Actions(of(new LoginUserSuccessAction(user, rememberMe)));

        const effects = createEffects(actions$);
        await effects.loginUserSuccess$.subscribe();

        expect(messageService.showSuccessMessage).toHaveBeenCalled();
    });


    it('deletes the token cookie upon LoginUserErrorAction', async() => {
        const actions$ = new Actions(of(new LoginUserErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.loginUserError$.subscribe();

        expect(clientStorageService.deletePersistedToken).toHaveBeenCalled();
    });


    it('shows a error message upon LoginUserErrorAction', async() => {
        const actions$ = new Actions(of(new LoginUserErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.loginUserError$.subscribe();

        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });
});
