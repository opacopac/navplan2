import * as ol from 'openlayers';
import { UnitconversionService } from '../../shared/services/unitconversion/unitconversion.service';
import { StringnumberService } from '../../shared/services/stringnumber/stringnumber.service';
import { OlFeature } from '../../shared/model/ol-feature';
import { SearchItem } from '../../search/model/search-item';
import { OlSearchItem } from './ol-searchitem';


const MAX_POINTS = 6;


export class OlSearchItemSelection extends OlFeature {
    constructor(public searchItems: SearchItem[]) {
        super(undefined);
    }


    public draw(source: ol.source.Vector) {
        const sortedItemsAngles = this.calcLabelPositions();
        const sortedItems = sortedItemsAngles[0];
        const labelAnglesDeg = sortedItemsAngles[1];

        for (let i = 0; i < sortedItems.length; i++) {
            const dataItemFeature = new OlSearchItem(sortedItems[i], labelAnglesDeg[i]);
            dataItemFeature.draw(source);
        }
    }


    private calcLabelPositions(): [SearchItem[], number[]] {
        // limit to 6 points
        if (this.searchItems.length > MAX_POINTS) {
            this.searchItems = this.searchItems.splice(0, MAX_POINTS);
        }

        // split up into partitions
        const numPointsB = Math.floor(this.searchItems.length / 3);
        const numPointsT = this.searchItems.length - numPointsB;
        const numPointsTR = Math.floor(numPointsT / 2);
        const numPointsTL = numPointsT - numPointsTR;

        // create top/bottom partitions
        const pointsT = this.searchItems.slice(0).sort(
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
        StringnumberService.multiPush(pointsTL, sortedItems);
        StringnumberService.multiPush(pointsTR, sortedItems);
        StringnumberService.multiPush(pointsB, sortedItems);

        // labels
        this.calcLabelAngles(pointsTL, Math.PI * 1.5);
        this.calcLabelAngles(pointsTR, 0.0);
        this.calcLabelAngles(pointsB, Math.PI);

        const labelAnglesDeg = [];
        StringnumberService.multiPush(this.calcLabelAngles(pointsTL, Math.PI * 1.5), labelAnglesDeg);
        StringnumberService.multiPush(this.calcLabelAngles(pointsTR, 0.0), labelAnglesDeg);
        StringnumberService.multiPush(this.calcLabelAngles(pointsB, Math.PI), labelAnglesDeg);

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


    private calcLabelAngles(searchItems: SearchItem[], rotationRad: number): number[] {
        if (searchItems.length === 0) {
            return;
        }

        const rotOffset = 0;
        const rotInc = Math.PI / 2 / (searchItems.length + 1);
        const labelAnglesDeg: number[] = [];
        for (let i = 0; i < searchItems.length; i++) {
            const lableAngle_deg = UnitconversionService.rad2deg(rotationRad + (i + 1) * rotInc + rotOffset);
            labelAnglesDeg.push(lableAngle_deg);
        }

        return labelAnglesDeg;
    }
}
