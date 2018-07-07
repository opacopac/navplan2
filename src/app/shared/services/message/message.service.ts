import { Injectable } from '@angular/core';


export enum MessageType {
    SUCCESS = 1,
    ERROR = 2
}


@Injectable({
    providedIn: 'root'
})
export class MessageService {
    public message: string;
    public messageType: MessageType;


    constructor() { }


    public writeSuccessMessage(message: string, autoClear: boolean = true) {
        this.writeMessage(MessageType.SUCCESS, message, autoClear);
    }


    public writeErrorMessage(message: string, autoClear: boolean = true) {
        this.writeMessage(MessageType.ERROR, message, autoClear);
    }


    public writeMessage(type: MessageType, message: string, autoClear: boolean) {
        this.message = message;
        this.messageType = type;

        if (autoClear) {
            setTimeout(this.clearMessage.bind(this), 3000);
        }
    }


    public clearMessage() {
        this.message = undefined;
        this.messageType = undefined;
    }
}
