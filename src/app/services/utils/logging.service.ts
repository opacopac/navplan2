import { Injectable } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';


export enum LogLevel {
    ERROR = 1,
    WARNING = 2,
    INFO = 3,
    DEBUG = 4
}


@Injectable()
export class LoggingService {
    constructor() { }

    public static log(level: LogLevel, message: string) {
        switch (level)
        {
            case LogLevel.ERROR:
                console.error(message);
                break;
            case LogLevel.WARNING:
                console.warn(message);
                break;
            case LogLevel.INFO:
                console.log(message);
                break;
            case LogLevel.DEBUG:
                console.log(message);
                break;
        }
    }

    public static logError(message: string) {
        console.error(message);
    }

    public static logResponseError(message: string, response: HttpResponseBase) {
        console.error(message);
        console.error(response);
    }
}
