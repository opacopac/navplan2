import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import {ChangePwAction, ChangePwErrorAction, ChangePwSuccessAction} from './user.actions';
import {ClientstorageHelper} from '../../system/domain-service/clientstorage/clientstorage-helper';
import {Router} from '@angular/router';
import {MessageService} from '../../message/domain-service/message.service';
import {ChangePwEffects} from './change-pw.effects';
import {UserService} from '../domain-service/user.service';
import createSpyObj = jasmine.createSpyObj;


describe('ChangePwEffects', () => {
    let token, pw, pwNew, errorText: string;
    let error: Error;
    let router: jasmine.SpyObj<Router>;
    let clientStorageService: jasmine.SpyObj<ClientstorageHelper>;
    let userService: jasmine.SpyObj<UserService>;
    let messageService: jasmine.SpyObj<MessageService>;


    function createEffects(actions$: Actions): ChangePwEffects {
        return new ChangePwEffects(
            actions$,
            userService,
            messageService
        );
    }


    beforeEach(() => {
        token = '123456';
        pw = '012345';
        pwNew = '01234567';
        errorText = 'MEEP';
        error = new Error(errorText);

        router = createSpyObj<Router>('router', ['navigate']);
        clientStorageService = createSpyObj<ClientstorageHelper>('clientStorageService', ['persistToken', 'deletePersistedToken']);
        userService = createSpyObj<UserService>('userService', ['updatePassword']);
        messageService = createSpyObj<MessageService>('messageService', ['showSuccessMessage', 'showErrorMessage']);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    it('calls userService.updatePassword upon ChangePwAction', async () => {
        const actions$ = new Actions(of(new ChangePwAction(token, pw, pwNew)));
        userService.updatePassword.and.returnValue(of(true));

        const effects = createEffects(actions$);
        await effects.changePw$.subscribe();

        expect(userService.updatePassword).toHaveBeenCalledWith(token, pw, pwNew);
    });


    it('sends a ChangePwSuccessAction upon ChangePwAction in success case', async (done) => {
        const actions$ = new Actions(of(new ChangePwAction(token, pw, pwNew)));
        userService.updatePassword.and.returnValue(of(true));

        const effects = createEffects(actions$);
        await effects.changePw$.subscribe((action) => {
            expect(action).toEqual(new ChangePwSuccessAction());
            done();
        });
    });


    it('sends a ChangePwErrorAction upon ChangePwAction in error case', async (done) => {
        const actions$ = new Actions(of(new ChangePwAction(token, pw, pwNew)));
        userService.updatePassword.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.changePw$.subscribe((action) => {
            expect(action).toEqual(new ChangePwErrorAction(error));
            done();
        });
    });


    it('shows a success message upon ChangePwSuccessAction', async () => {
        const actions$ = new Actions(of(new ChangePwSuccessAction()));

        const effects = createEffects(actions$);
        await effects.changePwSuccess$.subscribe();

        expect(messageService.showSuccessMessage).toHaveBeenCalled();
    });


    it('shows a error message upon ChangePwErrorAction', async () => {
        const actions$ = new Actions(of(new ChangePwErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.changePwError$.subscribe();

        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });
});
