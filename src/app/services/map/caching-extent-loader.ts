import { Extent } from '../../model/ol-model/extent';


const MAX_CACHE_ENTRIES = 10;


export abstract class CachingExtentLoader<T> {
    protected cacheItemList: ExtentCacheItem<T>[];
    protected lastLoadTimestampSec: number;


    public constructor() {
        this.cacheItemList = [];
    }


    public abstract getOversizeFactor(): number;


    public abstract isTimedOut(ageSec: number): boolean;


    public needsReload(extent: Extent, zoom: number): boolean {
        // check "current" cache item (at pos 0)
        if (this.cacheItemList.length > 0 &&
            this.cacheItemList[0].containsExtentZoom(extent, zoom) &&
            !this.isTimedOut(this.cacheItemList[0].getAgeSec())) {
            return false;
        } else {
            return true;
        }
    }


    public load(
        extent: Extent,
        zoom: number,
        successCallback: (T) => void,
        errorCallback: (string) => void) {

        if (!this.containsValidCacheItem(extent, zoom)) {
            this.lastLoadTimestampSec = Math.floor(Date.now() / 1000);
            const oversizeExtent = extent.getOversizeExtent(this.getOversizeFactor());
            this.loadFromSource(
                oversizeExtent,
                zoom,
                this.addToCacheAndCallback.bind(this, [oversizeExtent, zoom, successCallback]),
                errorCallback);
        } else {
            this.loadFromCache(extent, zoom, successCallback);
        }
    }


    protected abstract loadFromSource(
        extent: Extent,
        zoom: number,
        successCallback: (T) => void,
        errorCallback: (string) => void);


    private addToCacheAndCallback([extent, zoom, successCallback], item: T) {
        const cacheItem = new ExtentCacheItem(extent, zoom, item);
        this.addToFront(cacheItem);

        if (successCallback) {
            successCallback(item);
        }
    }


    private loadFromCache(extent: Extent, zoom: number, successCallback: (T) => void) {
        const cacheItem = this.getMatchingCacheItem(extent, zoom);
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


    private containsValidCacheItem(extent, zoom): boolean {
        const cacheItem = this.getMatchingCacheItem(extent, zoom);
        if (cacheItem && !this.isTimedOut(cacheItem.getAgeSec())) {
            return true;
        } else {
            return false;
        }
    }


    private getMatchingCacheItem(extent, zoom): ExtentCacheItem<T> {
        for (const cacheItem of this.cacheItemList) {
            if (cacheItem.containsExtentZoom(extent, zoom)) {
                return cacheItem;
            }
        }

        return undefined;
    }
}


export class ExtentCacheItem<T> {
    public extent: Extent;
    public zoom: number;
    public timestampSec: number;
    public item: T;


    public constructor(extent: Extent, zoom: number, item: T) {
        this.extent = extent;
        this.zoom = zoom;
        this.timestampSec = Math.floor(Date.now() / 1000);
        this.item = item;
    }


    public getAgeSec(): number {
        return Math.floor(Date.now() / 1000) - this.timestampSec;
    }


    public containsExtentZoom(extent: Extent, zoom: number): boolean {
        return (this.zoom === zoom && this.extent.containsExtent(extent));
    }
}
