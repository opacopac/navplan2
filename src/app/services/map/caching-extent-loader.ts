import { Extent } from '../../model/ol-model/extent';


export abstract class CachingExtentLoader<T> {
    protected itemCache: ExtentItemCache<T>;


    public abstract getOversizeFactor(): number;


    public abstract getMaxAgeSec(): number; // TODO: replace by isValid() or so


    public load(
        extent: Extent,
        successCallback: (T) => void,
        errorCallback: (string) => void) {

        if (this.itemCache && this.itemCache.extent.containsExtent(extent)
            && (!this.getMaxAgeSec() || this.itemCache.getAgeSec() < this.getMaxAgeSec())) {
            this.loadFromCache(successCallback);
        } else {
            const oversizeExtent = extent.getOversizeExtent(this.getOversizeFactor());
            this.loadFromSource(
                oversizeExtent,
                this.addToCacheAndCallback.bind(this, [oversizeExtent, successCallback]),
                errorCallback);
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
