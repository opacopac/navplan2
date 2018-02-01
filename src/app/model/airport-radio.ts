export interface AirportRadioRestItem {
    category: string;
    frequency: string;
    type: string;
    typespec: string;
    description: string;
}


export class AirportRadio {
    category: string;
    frequency: string;
    type: string;
    typespec: string;
    description: string;

    constructor(restItem: AirportRadioRestItem) {
        this.category = restItem.category;
        this.frequency = restItem.frequency;
        this.type = restItem.type;
        this.typespec = restItem.typespec;
        this.description = restItem.description;
    }
}
