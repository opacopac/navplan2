import {HttpResponseBase} from '@angular/common/http';


export enum LogLevel {
    ERROR = 1,
    WARNING = 2,
    INFO = 3,
    DEBUG = 4
}


export class LoggingService {
    public static log(level: LogLevel, message: string) {
        switch (level) {
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
        this.log(LogLevel.ERROR, message);
    }


    public static logWarning(message: string) {
        this.log(LogLevel.WARNING, message);
    }


    public static logInfo(message: string) {
        this.log(LogLevel.INFO, message);
    }


    public static logDebug(message: string) {
        this.log(LogLevel.DEBUG, message);
    }


    public static logResponseError(message: string, response: HttpResponseBase) {
        console.error(message);
        console.error(response); // TODO
    }


    public static logAction(message: string, object: object) {
        console.log(message);
        console.log(object);
    }
}
