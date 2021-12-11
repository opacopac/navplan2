import {Angle} from '../../../geo-physics/domain-model/quantities/angle';
import {Position2d} from '../../../geo-physics/domain-model/geometry/position2d';
import {Length} from '../../../geo-physics/domain-model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain-model/quantities/length-unit';

export class StringnumberHelper {
    public static isNullOrEmpty(text: string) {
        return (!text || text === '');
    }


    public static getNonNullOrDefault(value1: string, value2: string, defaultValue: string): string {
        if (this.isNullOrEmpty(value1)) {
            return value2;
        } else if (this.isNullOrEmpty(value2)) {
            return value1;
        } else {
            return defaultValue;
        }
    }


    public static parseStringOrNull(value: string | undefined, trim: boolean = true, toUpperCase: boolean = false): string | undefined {
        if (!value) {
            return undefined;
        }

        if (trim) {
            value = value.trim();
        }

        if (value === '') {
            return undefined;
        }

        return value;
    }


    public static zeroPad(number: number, digits: number = 2): string {
        let text = number.toString();
        while (text.length < digits) {
            text = '0' + text;
        }

        return text;
    }


    public static roundToDigits(num: number, digits: number): number {
        return Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits);
    }


    public static equals(num1: number, num2: number, precisionDigits?: number): boolean {
        if (precisionDigits === undefined) {
            return num1 === num2;
        } else {
            return Math.round(num1 * Math.pow(10, precisionDigits))
                === Math.round(num2 * Math.pow(10, precisionDigits));
        }
    }


    public static capitalize(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    public static getEWString(angle: Angle, digits: number): string {
        const angleValue = StringnumberHelper.roundToDigits(angle.deg, digits);

        if (angleValue > 0) {
            return angleValue.toString() + '° E';
        } else {
            return Math.abs(angleValue).toString() + '° W';
        }
    }


    public static getDecString(position: Position2d, digits: number): string {
        const latString = StringnumberHelper.roundToDigits(position.latitude, digits);
        const lonString = StringnumberHelper.roundToDigits(position.longitude, digits);

        return latString + ' ' + lonString;
    }


    public static getDmsString(position: Position2d): string {
        let latString = StringnumberHelper.getCoordString(position.latitude);
        if (position.latitude >= 0) {
            latString += ' N';
        } else {
            latString += ' S';
        }

        let lonString = StringnumberHelper.getCoordString(position.longitude);
        if (position.longitude >= 0) {
            lonString += ' E';
        } else {
            lonString += ' W';
        }

        return latString + ' / ' + lonString;
    }


    private static getCoordString(coord: number): string {
        if (coord < 0) {
            coord = -coord;
        }

        const d = Math.floor(coord);
        const m = Math.floor((coord - d) * 60);
        const s = Math.floor((coord - d - m / 60) * 3600);

        return d + '° ' + StringnumberHelper.zeroPad(m) + '\' ' + StringnumberHelper.zeroPad(s) + '\"';
    }


    public static getLengthString(elevation: Length, unit: LengthUnit): string {
        switch (unit) {
            case LengthUnit.M: return Math.round(elevation.m) + ' m';
            case LengthUnit.FT: return Math.round(elevation.ft) + ' ft';
            case LengthUnit.NM: return Math.round(elevation.nm) + ' NM';
            default: throw new Error('unknown length unit ' + unit);
        }
    }


    public static getMorseString(text: string): string {
        const morse = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..',
            'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
            'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
            '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
            '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----' };

        let out = '';

        for (let i = 0; i < text.length; i++) {
            if (i > 0) {
                out += ' ';
            }

            const code = morse[text.substring(i, i + 1).toUpperCase()];

            if (code && code.length > 0) {
                out += code;
            }
        }

        return out;
    }


    public static multiPush<T>(values: T[], targetArray: T[]) {
        if (!values || !targetArray) {
            return;
        }

        for (const item of values) {
            targetArray.push(item);
        }
    }
}
