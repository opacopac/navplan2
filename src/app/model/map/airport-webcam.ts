export interface AirportWebcamRestItem {
    name: string;
    url: string;
}


export class AirportWebcam {
    name: string;
    url: string;


    constructor(restItem: AirportWebcamRestItem) {
        this.name = restItem.name;
        this.url = restItem.url;
    }
}
