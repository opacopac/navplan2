import {UserState} from '../domain-model/user-state';
import {userReducer} from './user.reducer';


describe('userReducer', () => {
    let state: UserState;


    beforeEach(() => {
        state = {
            currentUser: undefined,
            registerEmailSentTo: undefined,
            lostPwEmailSentTo: undefined,
        };
    });


    /*it('sets the current user upon UserStateSetCurrentUserAcrion', () => {
        const user = new User('test@navplan.ch', '12345');
        const action = new UserStateSetCurrentUserAction(user);

        const newState = userReducer(state, action);

        expect(newState.currentUser).toEqual(user);
    });


    it('sets the current user upon UserStateSetCurrentUserAcrion (undefined case)', () => {
        const action = new UserStateSetCurrentUserAction(undefined);

        const newState = userReducer(state, action);

        expect(newState.currentUser).toEqual(undefined);
    });*/

});
