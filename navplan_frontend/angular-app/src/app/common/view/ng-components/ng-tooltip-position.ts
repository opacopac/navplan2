import {TooltipPosition} from '../model/tooltip-position';

export class NgTooltipPosition {
    public static getValue(position: TooltipPosition): 'left' | 'right' | 'above' | 'below' | 'before' | 'after' {
        switch (position) {
            case TooltipPosition.LEFT:
                return 'left';
            case TooltipPosition.RIGHT:
                return 'right';
            case TooltipPosition.ABOVE:
                return 'above';
            case TooltipPosition.BELOW:
                return 'below';
            case TooltipPosition.BEFORE:
                return 'before';
            case TooltipPosition.AFTER:
            default:
                return 'after';
        }
    }
}
