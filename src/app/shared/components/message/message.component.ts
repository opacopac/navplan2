import { Component, OnInit } from '@angular/core';
import { MessageService, MessageType } from '../../../core/services/utils/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

    constructor(public messageService: MessageService) {
    }


    ngOnInit() {
    }


    isSuccess() {
        return this.messageService.messageType === MessageType.SUCCESS;
    }


    isError() {
        return this.messageService.messageType === MessageType.ERROR;
    }
}
