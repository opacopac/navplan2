import {Extent2d} from '../../model/extent2d';
import {User} from '../../../user/model/user';


const MAX_CACHE_ENTRIES = 10;


export abstract class CachingExtentLoader<T> {
    protected cacheItemList: ExtentCacheItem<T>[];
    protected lastLoadTimestampSec: number;


    public constructor() {
        this.cacheItemList = [];
    }


    public abstract getOversizeFactor(): number;


    public abstract isTimedOut(ageSec: number): boolean;


    public needsReload(extent: Extent2d, zoom: number, user: User): boolean {
        // check "current" cache item (at pos 0)
        if (this.cacheItemList.length > 0 &&
            this.cacheItemList[0].containsExtentZoom(extent, zoom, user) &&
            !this.isTimedOut(this.cacheItemList[0].getAgeSec())) {
            return false;
        } else {
            return true;
        }
    }


    public load(
        extent: Extent2d,
        zoom: number,
        user: User,
        successCallback: (T) => void,
        errorCallback: (string) => void) {

        if (!this.containsValidCacheItem(extent, zoom, user)) {
            this.lastLoadTimestampSec = Math.floor(Date.now() / 1000);
            const oversizeExtent = extent.getOversizeExtent(this.getOversizeFactor());
            this.loadFromSource(
                oversizeExtent,
                zoom,
                user,
                this.addToCacheAndCallback.bind(this, [oversizeExtent, zoom, user, successCallback]),
                errorCallback);
        } else {
            this.loadFromCache(extent, zoom, user, successCallback);
        }
    }


    protected abstract loadFromSource(
        extent: Extent2d,
        zoom: number,
        user: User,
        successCallback: (T) => void,
        errorCallback: (string) => void);


    private addToCacheAndCallback([extent, zoom, user, successCallback], item: T) {
        const cacheItem = new ExtentCacheItem(extent, zoom, user, item);
        this.addToFront(cacheItem);

        if (successCallback) {
            successCallback(item);
        }
    }


    private loadFromCache(extent: Extent2d, zoom: number, user: User, successCallback: (T) => void) {
        const cacheItem = this.getMatchingCacheItem(extent, zoom, user);
        this.addToFront(cacheItem);

        if (successCallback && cacheItem) {
            successCallback(cacheItem.item);
        }
    }


    private addToFront(cacheItem: ExtentCacheItem<T>): void {
        // check & remove if already existing
        const index = this.cacheItemList.indexOf(cacheItem);
        if (index >= 0) {
            this.cacheItemList.splice(index, 1);
        }

        // add to front
        this.cacheItemList.unshift(cacheItem);

        // shorten list to max size
        if (this.cacheItemList.length > MAX_CACHE_ENTRIES) {
            this.cacheItemList.splice(MAX_CACHE_ENTRIES);
        }
    }


    private containsValidCacheItem(extent: Extent2d, zoom: number, user: User): boolean {
        const cacheItem = this.getMatchingCacheItem(extent, zoom, user);
        if (cacheItem && !this.isTimedOut(cacheItem.getAgeSec())) {
            return true;
        } else {
            return false;
        }
    }


    private getMatchingCacheItem(extent: Extent2d, zoom: number, user: User): ExtentCacheItem<T> {
        for (const cacheItem of this.cacheItemList) {
            if (cacheItem.containsExtentZoom(extent, zoom, user)) {
                return cacheItem;
            }
        }

        return undefined;
    }
}


export class ExtentCacheItem<T> {
    public timestampSec: number;


    public constructor(
        public extent: Extent2d,
        public zoom: number,
        public user: User,
        public item: T) {
        this.timestampSec = Math.floor(Date.now() / 1000);
    }


    public getAgeSec(): number {
        return Math.floor(Date.now() / 1000) - this.timestampSec;
    }


    public containsExtentZoom(extent: Extent2d, zoom: number, user: User): boolean {
        return (this.zoom === zoom && this.extent.containsExtent(extent) && user === this.user);
    }
}
