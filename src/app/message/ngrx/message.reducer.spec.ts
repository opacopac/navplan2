import {MessageState} from './message-state';
import {messageReducer} from './message.reducer';
import {ShowMessageAction} from './message.actions';
import {Message} from '../domain-model/message';


describe('messageReducer', () => {
    let initState: MessageState;


    beforeEach(() => {
        initState = { currentMessage: undefined };
    });


    it('updates the message state for a ShowMessageAction',  () => {
        const msg = Message.success('meep');
        const action = new ShowMessageAction(msg);

        const newState = messageReducer(initState, action);

        expect(newState).toBeDefined();
        expect(newState.currentMessage).toEqual(msg);
    });
});
