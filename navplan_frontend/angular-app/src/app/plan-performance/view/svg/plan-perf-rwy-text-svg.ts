import {SvgPolygonBuilder} from '../../../common/svg/svg-polygon-builder';

export class PlanPerfRwyTextSvg {
    private static LETTER_0_POLY_M = [[0, 0], [0, 9], [3, 9], [3, 0], [0, 0],
        [0.8, 1.5], [2.2, 1.5], [2.2, 7.5], [0.8, 7.5], [0.8, 1.5]];
    private static LETTER_1_POLY_M = [[1.1, 9], [1.1, 1.5], [0.8, 1.5], [0.8, 0.3], [1.1, 0], [1.9, 0], [1.9, 9]];
    private static LETTER_2_POLY_M = [[0, 0], [3, 0], [3, 2.9], [0.8, 6.4], [0.8, 7.5], [3, 7.5], [3, 9], [0, 9],
        [0, 6.4], [2.2, 2.9], [2.2, 1.5], [0.8, 1.5], [0.8, 2.4], [0, 2.4]];
    private static LETTER_3_POLY_M = [[0, 0], [3, 0], [3, 2.5], [1.8, 3.6], [3, 4.7], [3, 9],
        [0, 9], [0, 7.5], [2.2, 7.5], [2.2, 4.9], [0.8, 3.6], [2.2, 2.3], [2.2, 1.5], [0, 1.5]];
    private static LETTER_4_POLY_M = [[3, 2.7], [3, 5.6], [3.9, 5.6], [3.9, 7.1], [3, 7.1], [3, 9],
        [2.2, 9], [2.2, 7.1], [0, 7.1], [1.6, 0], [2.3, 0], [1.1, 5.6], [2.2, 5.6, 2.2, 2.7]];
    private static LETTER_5_POLY_M = [[0, 0], [3, 0], [3, 1.5], [0.8, 1.5], [0.8, 2.7], [3, 2.7], [3, 9],
        [0, 9], [0, 7.5], [2.2, 7.5], [2.2, 4.2], [0, 4.2]];
    private static LETTER_6_POLY_M = [[0.8, 4], [3, 4], [3, 9], [0, 9], [0, 2], [2.2, 0], [2.2, 1],
        [0.8, 2.3], [0.8, 7.5], [2.2, 7.5], [2.2, 5.5], [0.8, 5.5]];
    private static LETTER_7_POLY_M = [[0, 0], [3.5, 0], [1.1, 9], [0.3, 9], [2.2, 1.5], [0, 1.5]];
    private static LETTER_8_POLY_M = [[0, 0], [3, 0], [3, 3.4], [2.4, 3.9], [3, 4.5], [3, 9],
        [2.2, 7.5], [2.2, 4.5], [0.8, 4.5], [0.8, 7.5], [2.2, 7.5], [3, 9], [0, 9], [0, 4.5], [0.6, 3.9], [0, 3.4],
        [0, 0], [0.8, 1.5], [0.8, 3.4], [2.2, 3.4], [2.2, 1.5], [0.8, 1.5]];
    private static LETTER_9_POLY_M = [[2.2, 5.5], [0, 5.5], [0, 0], [3, 0], [3, 7], [0.8, 9], [0.8, 8],
        [2.2, 6.6], [2.2, 1.5], [0.8, 1.5], [0.8, 4], [2.2, 4]];
    private static LETTER_L_POLY_M = [[0, 0], [0, 7], [3, 9], [3, 7.5], [1.1, 7.5], [1.1, 0]];
    private static LETTER_R_POLY_M = [[0, 0], [3, 0], [3, 5.3], [2.2, 5.3], [3, 9], [2.2, 9], [1.4, 5.3],
        [0.8, 5.3], [0.8, 3.8], [2.2, 3.8], [2.2, 1.5], [0.8, 1.5], [0.8, 9], [0, 9]];
    private static LETTER_C_POLY_M = [[0, 0], [3, 0], [3, 2.1], [2.2, 2.1], [2.2, 1.5], [0.8, 1.5],
        [0.8, 7.5], [2.2, 7.5], [2.2, 6.9], [3, 6.9], [3, 9], [0, 9]];
    private static LETTERS: [string, number[][]][] = [
        ['0', PlanPerfRwyTextSvg.LETTER_0_POLY_M],
        ['1', PlanPerfRwyTextSvg.LETTER_1_POLY_M],
        ['2', PlanPerfRwyTextSvg.LETTER_2_POLY_M],
        ['3', PlanPerfRwyTextSvg.LETTER_3_POLY_M],
        ['4', PlanPerfRwyTextSvg.LETTER_4_POLY_M],
        ['5', PlanPerfRwyTextSvg.LETTER_5_POLY_M],
        ['6', PlanPerfRwyTextSvg.LETTER_6_POLY_M],
        ['7', PlanPerfRwyTextSvg.LETTER_7_POLY_M],
        ['8', PlanPerfRwyTextSvg.LETTER_8_POLY_M],
        ['9', PlanPerfRwyTextSvg.LETTER_9_POLY_M],
        ['L', PlanPerfRwyTextSvg.LETTER_L_POLY_M],
        ['R', PlanPerfRwyTextSvg.LETTER_R_POLY_M],
        ['C', PlanPerfRwyTextSvg.LETTER_C_POLY_M],
    ];

    public static createLetter(letter: string, fnCalcXy: ([x, y]) => [number, number]): SVGElement {
        const letterSvg = SvgPolygonBuilder.builder();
        const poly = PlanPerfRwyTextSvg.LETTERS.find(l => l[0] === letter);

        if (poly) {
            poly[1].forEach(p => letterSvg.addPoint(fnCalcXy([p[0], p[1]])));
        }

        return letterSvg
            .setFillStrokeColorWidth('white', 'none', 0)
            .setShapeRenderingCrispEdges()
            .build();
    }
}
