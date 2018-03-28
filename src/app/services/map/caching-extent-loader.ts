import { Extent } from '../../model/ol-model/extent';


export abstract class CachingExtentLoader<T> {
    protected itemCache: ExtentItemCache<T>;
    protected lastLoadTimestampSec: number;


    public abstract getOversizeFactor(): number;


    public abstract isTimedOut(): boolean;


    public needsReload(extent: Extent): boolean {
        return true; // TODO

        /*if (!this.itemCache) {
            return true;
        }

        return (!this.itemCache.extent.containsExtent(extent) || this.isTimedOut());*/
    }


    public load(
        extent: Extent,
        successCallback: (T) => void,
        errorCallback: (string) => void) {

        if (this.needsReload(extent)) {
            this.lastLoadTimestampSec = Math.floor(Date.now() / 1000);
            const oversizeExtent = extent.getOversizeExtent(this.getOversizeFactor());
            this.loadFromSource(
                oversizeExtent,
                this.addToCacheAndCallback.bind(this, [oversizeExtent, successCallback]),
                errorCallback);
        } else {
            this.loadFromCache(successCallback);
        }
    }


    private addToCacheAndCallback([extent, successCallback], item: T) {
        this.itemCache = new ExtentItemCache(extent, item);

        if (successCallback) {
            successCallback(item);
        }
    }


    protected abstract loadFromSource(
        extent: Extent,
        successCallback: (T) => void,
        errorCallback: (string) => void);


    protected loadFromCache(successCallback: (T) => void) {
        if (successCallback) {
            successCallback(this.itemCache.item);
        }
    }
}


export class ExtentItemCache<T> {
    public extent: Extent;
    public timestampSec: number;
    public item: T;

    public constructor(extent: Extent, item: T) {
      this.extent = extent;
      this.timestampSec = Math.floor(Date.now() / 1000);
      this.item = item;
    }

    public getAgeSec(): number {
        return Math.floor(Date.now() / 1000) - this.timestampSec;
    }
}
