import {SearchItem} from './search-item';
import {DataItem} from '../../../common/domain/model/data-item';


export class SearchItemList {
    public items: SearchItem[];


    constructor() {
        this.items = [];
    }


    public appendSearchItem(item: DataItem) {
        this.items.push(new SearchItem(item));
    }
}


