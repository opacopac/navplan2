import {MessageType} from './message-type';


export class Message {
    public static error(messageText: string, error?: Error): Message {
        if (error) {
            messageText = messageText + ' ' + error.message;
        }

        return new Message(
            MessageType.ERROR,
            messageText
        );
    }


    public static success(messageText: string): Message {
        return new Message(
            MessageType.SUCCESS,
            messageText
        );
    }


    public constructor(
        public type: MessageType,
        public messageText: string) {
    }
}
