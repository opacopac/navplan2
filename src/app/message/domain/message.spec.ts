import {Message} from './message';
import {MessageType} from './message-type';


describe('Message', () => {
    it('creates a message', () => {
        const msg = new Message(MessageType.SUCCESS, 'meep');

        expect(msg).toBeDefined();
        expect(msg.type).toEqual(MessageType.SUCCESS);
        expect(msg.messageText).toEqual('meep');
    });


    it('creates a success message', () => {
        const msg = Message.success('meep');

        expect(msg).toBeDefined();
        expect(msg.type).toEqual(MessageType.SUCCESS);
        expect(msg.messageText).toEqual('meep');
    });


    it('creates an error message without an error', () => {
        const msg = Message.error('meep');

        expect(msg).toBeDefined();
        expect(msg.type).toEqual(MessageType.ERROR);
        expect(msg.messageText).toEqual('meep');
    });


    it('creates an error message with an error', () => {
        const error = new Error('maap');
        const msg = Message.error('meep', error);

        expect(msg).toBeDefined();
        expect(msg.type).toEqual(MessageType.ERROR);
        expect(msg.messageText).toContain('meep');
        expect(msg.messageText).toContain('maap');
    });
});
