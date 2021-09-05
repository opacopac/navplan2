import {Observable, Subscription} from 'rxjs';
import {OlPositionSearchItem} from './ol-position-search-item';
import {PositionSearchState} from '../domain-model/position-search-state';
import {SearchItem} from '../domain-model/search-item';
import {StringnumberHelper} from '../../system/domain-service/stringnumber/stringnumber-helper';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {AngleUnit} from '../../common/geo-math/domain-model/quantities/units';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';


const MAX_POINTS = 6;


export class OlPositionSearchContainer {
    private readonly positionSearchSubscription: Subscription;


    constructor(
        private readonly positionSearchLayer: OlVectorLayer,
        searchItems$: Observable<PositionSearchState>
    ) {
        this.positionSearchSubscription = searchItems$.subscribe((posSearchState) => {
            this.clearFeatures();
            this.drawFeatures(posSearchState);
        });
    }


    public destroy() {
        this.positionSearchSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(posSearchState: PositionSearchState) {
        if (posSearchState) {
            const sortedItemsAngles = this.calcLabelPositions(posSearchState.searchItems);
            const sortedItems = sortedItemsAngles[0];
            const labelAngles = sortedItemsAngles[1];

            for (let i = 0; i < sortedItems.length; i++) {
                OlPositionSearchItem.draw(sortedItems[i], labelAngles[i], this.positionSearchLayer);
            }
        }
    }


    private clearFeatures() {
        this.positionSearchLayer.clear();
    }


    private calcLabelPositions(searchItems: SearchItem[]): [SearchItem[], Angle[]] {
        // limit to 6 points
        if (searchItems.length > MAX_POINTS) {
            searchItems = searchItems.slice(0, MAX_POINTS);
        }

        // split up into partitions
        const numPointsB = Math.floor(searchItems.length / 3);
        const numPointsT = searchItems.length - numPointsB;
        const numPointsTR = Math.floor(numPointsT / 2);
        const numPointsTL = numPointsT - numPointsTR;

        // create top/bottom partitions
        const pointsT = searchItems.slice(0).sort(
            function(a: SearchItem, b: SearchItem) { return b.getPosition().latitude - a.getPosition().latitude; });
        const pointsB = pointsT.splice(numPointsT, numPointsB);

        // create top left/right partitions
        const pointsTL = pointsT.slice(0).sort(
            function(a: SearchItem, b: SearchItem) { return a.getPosition().longitude - b.getPosition().longitude; });
        const pointsTR = pointsTL.splice(numPointsTL, numPointsTR);

        this.sortQuadrantClockwise(pointsTL, true, true);
        this.sortQuadrantClockwise(pointsTR, true, false);
        this.sortQuadrantClockwise(pointsB, false, true);

        const sortedItems: SearchItem[] = [];
        StringnumberHelper.multiPush(pointsTL, sortedItems);
        StringnumberHelper.multiPush(pointsTR, sortedItems);
        StringnumberHelper.multiPush(pointsB, sortedItems);

        // labels
        this.calcLabelAngles(pointsTL, Math.PI * 1.5);
        this.calcLabelAngles(pointsTR, 0.0);
        this.calcLabelAngles(pointsB, Math.PI);

        const labelAnglesDeg = [];
        StringnumberHelper.multiPush(this.calcLabelAngles(pointsTL, Math.PI * 1.5), labelAnglesDeg);
        StringnumberHelper.multiPush(this.calcLabelAngles(pointsTR, 0.0), labelAnglesDeg);
        StringnumberHelper.multiPush(this.calcLabelAngles(pointsB, Math.PI), labelAnglesDeg);

        return [sortedItems, labelAnglesDeg];
    }


    private sortQuadrantClockwise(searchItems: SearchItem[], isTopQuadrant: boolean, isLeftQuadrant: boolean) {
        if (!searchItems || searchItems.length <= 0) {
            return;
        }

        const center = { latitude: undefined, longitude: undefined };

        searchItems.sort(function(a: SearchItem, b: SearchItem) {
            return a.getPosition().latitude - b.getPosition().latitude; }); // bottom to top

        if (isTopQuadrant) {
            center.latitude = searchItems[0].getPosition().latitude - 0.1;
        } else {
            center.latitude = searchItems[searchItems.length - 1].getPosition().latitude + 0.1;
        }

        searchItems.sort(function(a: SearchItem, b: SearchItem) {
            return a.getPosition().longitude - b.getPosition().longitude; }); // left to right

        if (isLeftQuadrant) {
            center.longitude = searchItems[searchItems.length - 1].getPosition().longitude + 0.1;
        } else {
            center.longitude = searchItems[0].getPosition().longitude - 0.1;
        }

        searchItems.sort(function(a: SearchItem, b: SearchItem) {
            return Math.atan2(b.getPosition().latitude - center.latitude, b.getPosition().longitude - center.longitude)
                - Math.atan2(a.getPosition().latitude - center.latitude, a.getPosition().longitude - center.longitude);
        });
    }


    private calcLabelAngles(searchItems: SearchItem[], rotationRad: number): Angle[] {
        if (searchItems.length === 0) {
            return;
        }

        const rotOffset = 0;
        const rotInc = Math.PI / 2 / (searchItems.length + 1);
        const labelAngles: Angle[] = [];
        for (let i = 0; i < searchItems.length; i++) {
            const lableAngle = new Angle(rotationRad + (i + 1) * rotInc + rotOffset, AngleUnit.RAD);
            labelAngles.push(lableAngle);
        }

        return labelAngles;
    }
}
