import {Time} from '../../geo-physics/domain-model/quantities/time';


export class OlSmaMeasurementHelper {
    public static createCanvas(
        widthPx: number,
        heightPx: number,
        pixelRatio: number
    ): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        const ctx = this.getCanvasContext(canvas);
        canvas.width = widthPx * pixelRatio;
        canvas.height = heightPx * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);

        return canvas;
    }


    public static getCanvasContext(canvas): CanvasRenderingContext2D {
        return canvas.getContext('2d');
    }


    public static drawText(
        canvasContext: CanvasRenderingContext2D,
        x: number,
        y: number,
        text: string,
        fillColor: string,
        borderColor: string = '',
        borderWidth: number = 0
    ) {
        if (borderColor && borderWidth && borderWidth > 0) {
            canvasContext.strokeStyle = borderColor;
            canvasContext.lineWidth = borderWidth;
            canvasContext.strokeText(text, x, y);
        }

        canvasContext.fillStyle = fillColor;
        canvasContext.fillText(text, x, y);
    }


    public static drawRectangle(
        canvasContext: CanvasRenderingContext2D,
        x: number,
        y: number,
        widthPx: number,
        heightPx: number,
        fillColor: string,
        borderColor: string,
        borderWidth: number
    ) {
        canvasContext.fillStyle = fillColor;
        canvasContext.fillRect(x, y, widthPx, heightPx);

        if (borderColor && borderWidth && borderWidth > 0) {
            canvasContext.strokeStyle = borderColor;
            canvasContext.lineWidth = borderWidth;
            canvasContext.strokeRect(x, y, widthPx, heightPx);
        }
    }


    public static drawFillBox(
        canvasContext: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        borderWidth: number,
        color: string,
        levelFactor: number
    ) {
        canvasContext.lineWidth = borderWidth;
        canvasContext.strokeStyle = color;
        canvasContext.fillStyle = color;
        canvasContext.strokeRect(x, y, width, height);
        canvasContext.fillRect(x, y + height - height * levelFactor, width, height * levelFactor);
    }


    public static getSunColor(sunTime: Time): string {
        if (sunTime.min > 0) {
            return '#FFFF00';
        } else {
            return '#AAAA00';
        }
    }


    public static getRainColor(precip_mm: number): string {
        if (precip_mm > 0) {
            return '#00CCFF';
        } else {
            return '#0099AA';
        }
    }


    public static getSunLevelFact(sunTime: Time): number {
        return sunTime.min / 10;
    }


    public static getRainLevelFact(precip_mm: number): number {
        const minFact = 0.0;
        const maxLevelMm = 3;

        if (precip_mm >= 5) {
            return 1;
        } else if (precip_mm / maxLevelMm > minFact) {
            return precip_mm / maxLevelMm;
        } else if (precip_mm > 0.0) {
            return minFact;
        } else {
            return 0;
        }
    }
}
