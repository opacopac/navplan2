import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import {
    RegisterUserAction,
    RegisterUserErrorAction,
    RegisterUserSuccessAction,
    SendRegisterEmailAction,
    SendRegisterEmailErrorAction,
    SendRegisterEmailSuccessAction,
} from './user.actions';
import {User} from '../domain-model/user';
import {ClientstorageHelper} from '../../system/domain-service/clientstorage/clientstorage-helper';
import {Router} from '@angular/router';
import {RegisterEffects} from './register.effects';
import {MessageService} from '../../message/domain-service/message.service';
import {LoginEffects} from './login.effects';
import {UserService} from '../domain-service/user.service';
import createSpyObj = jasmine.createSpyObj;


describe('RegisterEffects', () => {
    let token, email, pw, errorText: string;
    let rememberMe: boolean;
    let user: User;
    let error: Error;
    let router: jasmine.SpyObj<Router>;
    let clientStorageService: jasmine.SpyObj<ClientstorageHelper>;
    let userService: jasmine.SpyObj<UserService>;
    let messageService: jasmine.SpyObj<MessageService>;


    function createEffects(actions$: Actions): RegisterEffects {
        return new RegisterEffects(
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
        userService = createSpyObj<UserService>('userService', ['sendRegisterEmail', 'register']);
        messageService = createSpyObj<MessageService>('messageService', ['showSuccessMessage', 'showErrorMessage']);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    // region send register email - step 1

    it('calls userService.sendRegisterEmail upon SendRegisterEmailAction', async () => {
        const actions$ = new Actions(of(new SendRegisterEmailAction(email)));
        userService.sendRegisterEmail.and.returnValue(of(email));

        const effects = createEffects(actions$);
        await effects.sendRegisterEmail$.subscribe();

        expect(userService.sendRegisterEmail).toHaveBeenCalledWith(email);
    });


    it('sends a SendRegisterEmailSuccessAction upon SendRegisterEmailAction in success case', async (done) => {
        const actions$ = new Actions(of(new SendRegisterEmailAction(email)));
        userService.sendRegisterEmail.and.returnValue(of(email));

        const effects = createEffects(actions$);
        await effects.sendRegisterEmail$.subscribe((action) => {
            expect(action).toEqual(new SendRegisterEmailSuccessAction(email));
            done();
        });
    });


    it('sends a SendRegisterEmailErrorAction upon SendRegisterEmailAction in error case', async (done) => {
        const actions$ = new Actions(of(new SendRegisterEmailAction(email)));
        userService.sendRegisterEmail.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.sendRegisterEmail$.subscribe((action) => {
            expect(action).toEqual(new SendRegisterEmailErrorAction(error));
            done();
        });
    });


    it('shows a success message upon SendRegisterEmailSuccessAction', async () => {
        const actions$ = new Actions(of(new SendRegisterEmailSuccessAction(email)));

        const effects = createEffects(actions$);
        await effects.sendRegisterEmailSuccess$.subscribe();

        expect(messageService.showSuccessMessage).toHaveBeenCalled();
    });


    it('shows a error message upon SendRegisterEmailErrorAction', async () => {
        const actions$ = new Actions(of(new SendRegisterEmailErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.sendRegisterEmailError$.subscribe();

        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });

    // endregion


    // region register user - step 2

    it('calls userService.register upon RegisterUserAction', async () => {
        const actions$ = new Actions(of(new RegisterUserAction(token, pw, rememberMe)));
        userService.register.and.returnValue(of(user));

        const effects = createEffects(actions$);
        await effects.registerUser$.subscribe();

        expect(userService.register).toHaveBeenCalledWith(token, pw, rememberMe);
    });


    it('sends a RegisterUserSuccessAction upon RegisterUserAction in success case', async (done) => {
        const actions$ = new Actions(of(new RegisterUserAction(token, pw, rememberMe)));
        userService.register.and.returnValue(of(user));

        const effects = createEffects(actions$);
        await effects.registerUser$.subscribe(action => {
            expect(action).toEqual(new RegisterUserSuccessAction(user, rememberMe));
            done();
        });
    });


    it('sends a RegisterUserErrorAction upon RegisterUserAction in error case', async (done) => {
        const actions$ = new Actions(of(new RegisterUserAction(token, pw, rememberMe)));
        userService.register.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.registerUser$.subscribe(action => {
            expect(action).toEqual(new RegisterUserErrorAction(error));
            done();
        });
    });


    it('persists the token cookie upon RegisterUserSuccessAction', async () => {
        const actions$ = new Actions(of(new RegisterUserSuccessAction(user, rememberMe)));

        const effects = createEffects(actions$);
        await effects.registerUserSuccess$.subscribe();

        expect(clientStorageService.persistToken).toHaveBeenCalledWith(token, rememberMe);
    });


    it('navigates to the map view upon RegisterUserSuccessAction', async () => {
        const actions$ = new Actions(of(new RegisterUserSuccessAction(user, rememberMe)));
        router.navigate.and.returnValue(of(true).toPromise());

        const effects = createEffects(actions$);
        await effects.registerUserSuccess$.subscribe();

        expect(router.navigate).toHaveBeenCalledWith([LoginEffects.ROUTE_URL_MAP]);
    });


    it('shows as success message upon RegisterUserSuccessAction', async () => {
        const actions$ = new Actions(of(new RegisterUserSuccessAction(user, rememberMe)));

        const effects = createEffects(actions$);
        await effects.registerUserSuccess$.subscribe();

        expect(messageService.showSuccessMessage).toHaveBeenCalled();
    });


    it('shows as error message upon RegisterUserErrorAction', async () => {
        const actions$ = new Actions(of(new RegisterUserErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.registerUserError$.subscribe();

        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });

    // endregion
});
