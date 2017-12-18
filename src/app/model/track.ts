import { Timestamp } from './timestamp';
import { Position4d } from './position';

export class Track {
    public id: number;
    public name: string;
    public positionList: Position4d[];
    public saveTime: Timestamp;


    constructor(id: number, name: string, positionList: Position4d[], saveTime: Timestamp) {
        this.id = id;
        this.name = name;
        this.positionList = positionList;
        this.saveTime = saveTime;
    }
}
