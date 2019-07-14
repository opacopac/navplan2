import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import {UserService} from '../rest/user.service';
import {
    ChangePwAction, ResetPwAction,
    ResetPwErrorAction, ResetPwSuccessAction,
    SendLostPwEmailAction, SendLostPwEmailErrorAction,
    SendLostPwEmailSuccessAction,
} from './user.actions';
import {User} from '../domain/user';
import {ClientstorageHelper} from '../../system/use-case/clientstorage/clientstorage-helper';
import {Router} from '@angular/router';
import createSpyObj = jasmine.createSpyObj;
import {MessageService} from '../../message/services/message.service';
import {LoginEffects} from './login.effects';
import {LostPwEffects} from './lost-pw.effects';


describe('LostPwEffects', () => {
    let token, email, pw, pwNew, errorText: string;
    let rememberMe: boolean;
    let user: User;
    let error: Error;
    let router: jasmine.SpyObj<Router>;
    let clientStorageService: jasmine.SpyObj<ClientstorageHelper>;
    let userService: jasmine.SpyObj<UserService>;
    let messageService: jasmine.SpyObj<MessageService>;


    function createEffects(actions$: Actions): LostPwEffects {
        return new LostPwEffects(
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
        pwNew = '01234567';
        user = new User(email, token);
        rememberMe = false;
        errorText = 'MEEP';
        error = new Error(errorText);

        router = createSpyObj<Router>('router', ['navigate']);
        clientStorageService = createSpyObj<ClientstorageHelper>('clientStorageService', ['persistToken', 'deletePersistedToken']);
        userService = createSpyObj<UserService>('userService', ['sendLostPwEmail', 'resetPassword']);
        messageService = createSpyObj<MessageService>('messageService', ['showSuccessMessage', 'showErrorMessage']);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    // region send lost pw email - step 1

    it('calls userService.sendLostPwEmail upon SendLostPwEmailAction', async () => {
        const actions$ = new Actions(of(new SendLostPwEmailAction(email)));
        userService.sendLostPwEmail.and.returnValue(of(email));

        const effects = createEffects(actions$);
        await effects.sendLostPwEmail$.subscribe();

        expect(userService.sendLostPwEmail).toHaveBeenCalledWith(email);
    });


    it('sends a SendLostPwEmailSuccessAction upon SendLostPwEmailAction in success case', async (done) => {
        const actions$ = new Actions(of(new SendLostPwEmailAction(email)));
        userService.sendLostPwEmail.and.returnValue(of(email));

        const effects = createEffects(actions$);
        await effects.sendLostPwEmail$.subscribe((action) => {
            expect(action).toEqual(new SendLostPwEmailSuccessAction(email));
            done();
        });
    });


    it('sends a SendLostPwEmailErrorAction upon SendLostPwEmailAction in error case', async (done) => {
        const actions$ = new Actions(of(new SendLostPwEmailAction(email)));
        userService.sendLostPwEmail.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.sendLostPwEmail$.subscribe((action) => {
            expect(action).toEqual(new SendLostPwEmailErrorAction(error));
            done();
        });
    });


    it('shows a success message upon SendLostPwEmailSuccessAction', async () => {
        const actions$ = new Actions(of(new SendLostPwEmailSuccessAction(email)));

        const effects = createEffects(actions$);
        await effects.sendLostPwEmailSuccess$.subscribe();

        expect(messageService.showSuccessMessage).toHaveBeenCalled();
    });


    it('shows a error message upon SendLostPwEmailErrorAction', async () => {
        const actions$ = new Actions(of(new SendLostPwEmailErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.sendLostPwEmailError$.subscribe();

        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });

    // endregion


    // region set new pw - step 2

    it('calls userService.resetPassword upon ResetPwAction', async () => {
        const actions$ = new Actions(of(new ResetPwAction(token, pw, rememberMe)));
        userService.resetPassword.and.returnValue(of(user));

        const effects = createEffects(actions$);
        await effects.resetPw$.subscribe();

        expect(userService.resetPassword).toHaveBeenCalledWith(token, pw, rememberMe);
    });


    it('sends a ResetPwSuccessAction upon ResetPwAction in success case', async (done) => {
        const actions$ = new Actions(of(new ResetPwAction(token, pw, rememberMe)));
        userService.resetPassword.and.returnValue(of(user));

        const effects = createEffects(actions$);
        await effects.resetPw$.subscribe(action => {
            expect(action).toEqual(new ResetPwSuccessAction(user, rememberMe));
            done();
        });
    });


    it('sends a ResetPwErrorAction upon ResetPwAction in error case', async (done) => {
        const actions$ = new Actions(of(new ResetPwAction(token, pw, rememberMe)));
        userService.resetPassword.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.resetPw$.subscribe(action => {
            expect(action).toEqual(new ResetPwErrorAction(error));
            done();
        });
    });


    it('persists the token cookie upon ResetPwSuccessAction', async () => {
        const actions$ = new Actions(of(new ResetPwSuccessAction(user, rememberMe)));

        const effects = createEffects(actions$);
        await effects.resetPwSuccess$.subscribe();

        expect(clientStorageService.persistToken).toHaveBeenCalledWith(token, rememberMe);
    });


    it('navigates to the map view upon ResetPwSuccessAction', async () => {
        const actions$ = new Actions(of(new ResetPwSuccessAction(user, rememberMe)));
        router.navigate.and.returnValue(of(true).toPromise());

        const effects = createEffects(actions$);
        await effects.resetPwSuccess$.subscribe();

        expect(router.navigate).toHaveBeenCalledWith([LoginEffects.ROUTE_URL_MAP]);
    });


    it('shows as success message upon ResetPwSuccessAction', async () => {
        const actions$ = new Actions(of(new ResetPwSuccessAction(user, rememberMe)));

        const effects = createEffects(actions$);
        await effects.resetPwSuccess$.subscribe();

        expect(messageService.showSuccessMessage).toHaveBeenCalled();
    });


    it('shows as error message upon ResetPwErrorAction', async () => {
        const actions$ = new Actions(of(new ResetPwErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.resetPwError$.subscribe();

        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });

    // endregion
});
