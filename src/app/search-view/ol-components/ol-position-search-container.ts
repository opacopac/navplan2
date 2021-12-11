import {Observable, Subscription} from 'rxjs';
import {OlPositionSearchItem} from './ol-position-search-item';
import {PositionSearchState} from '../../search/domain-model/position-search-state';
import {StringnumberHelper} from '../../system/domain-service/stringnumber/stringnumber-helper';
import {Angle} from '../../geo-physics/domain-model/quantities/angle';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {AngleUnit} from '../../geo-physics/domain-model/quantities/angle-unit';
import {IPointSearchResult} from '../../search/domain-model/i-point-search-result';


const MAX_POINTS = 6;


export class OlPositionSearchContainer {
    private readonly positionSearchSubscription: Subscription;


    constructor(
        private readonly positionSearchLayer: OlVectorLayer,
        positionSearchState$: Observable<PositionSearchState>
    ) {
        this.positionSearchSubscription = positionSearchState$.subscribe((posSearchState) => {
            this.clearFeatures();
            this.drawFeatures(posSearchState);
        });
    }


    public destroy() {
        this.positionSearchSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(posSearchState: PositionSearchState) {
        if (posSearchState && posSearchState.positionSearchResults) {
            const sortedItemsAngles = this.calcLabelPositions(posSearchState.positionSearchResults.getPointResults());
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


    private calcLabelPositions(pointSearchResult: IPointSearchResult[]): [IPointSearchResult[], Angle[]] {
        // skip non-point results (e.g. airspaces)
        pointSearchResult = pointSearchResult.filter(item => item.getPosition());

        // limit to 6 points
        if (pointSearchResult.length > MAX_POINTS) {
            pointSearchResult = pointSearchResult.slice(0, MAX_POINTS);
        }

        // split up into partitions
        const numPointsB = Math.floor(pointSearchResult.length / 3);
        const numPointsT = pointSearchResult.length - numPointsB;
        const numPointsTR = Math.floor(numPointsT / 2);
        const numPointsTL = numPointsT - numPointsTR;

        // create top/bottom partitions
        const pointsT = pointSearchResult.slice(0).sort(
            function(a: IPointSearchResult, b: IPointSearchResult) { return b.getPosition().latitude - a.getPosition().latitude; });
        const pointsB = pointsT.splice(numPointsT, numPointsB);

        // create top left/right partitions
        const pointsTL = pointsT.slice(0).sort(
            function(a: IPointSearchResult, b: IPointSearchResult) { return a.getPosition().longitude - b.getPosition().longitude; });
        const pointsTR = pointsTL.splice(numPointsTL, numPointsTR);

        this.sortQuadrantClockwise(pointsTL, true, true);
        this.sortQuadrantClockwise(pointsTR, true, false);
        this.sortQuadrantClockwise(pointsB, false, true);

        const sortedItems: IPointSearchResult[] = [];
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


    private sortQuadrantClockwise(pointSearchResults: IPointSearchResult[], isTopQuadrant: boolean, isLeftQuadrant: boolean) {
        if (!pointSearchResults || pointSearchResults.length <= 0) {
            return;
        }

        const center = { latitude: undefined, longitude: undefined };

        pointSearchResults.sort(function(a: IPointSearchResult, b: IPointSearchResult) {
            return a.getPosition().latitude - b.getPosition().latitude; }); // bottom to top

        if (isTopQuadrant) {
            center.latitude = pointSearchResults[0].getPosition().latitude - 0.1;
        } else {
            center.latitude = pointSearchResults[pointSearchResults.length - 1].getPosition().latitude + 0.1;
        }

        pointSearchResults.sort(function(a: IPointSearchResult, b: IPointSearchResult) {
            return a.getPosition().longitude - b.getPosition().longitude; }); // left to right

        if (isLeftQuadrant) {
            center.longitude = pointSearchResults[pointSearchResults.length - 1].getPosition().longitude + 0.1;
        } else {
            center.longitude = pointSearchResults[0].getPosition().longitude - 0.1;
        }

        pointSearchResults.sort(function(a: IPointSearchResult, b: IPointSearchResult) {
            return Math.atan2(b.getPosition().latitude - center.latitude, b.getPosition().longitude - center.longitude)
                - Math.atan2(a.getPosition().latitude - center.latitude, a.getPosition().longitude - center.longitude);
        });
    }


    private calcLabelAngles(pointSearchResults: IPointSearchResult[], rotationRad: number): Angle[] {
        if (pointSearchResults.length === 0) {
            return;
        }

        const rotOffset = 0;
        const rotInc = Math.PI / 2 / (pointSearchResults.length + 1);
        const labelAngles: Angle[] = [];
        for (let i = 0; i < pointSearchResults.length; i++) {
            const lableAngle = new Angle(rotationRad + (i + 1) * rotInc + rotOffset, AngleUnit.RAD);
            labelAngles.push(lableAngle);
        }

        return labelAngles;
    }
}
