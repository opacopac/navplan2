import {Angle} from '../../model/quantities/angle';

export class StringnumberService {
    public static isNullOrEmpty(text: string) {
        return (!text || text === '');
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


    public static equals(num1: number, num2: number, precisionDigits?: number){
        if (precisionDigits === undefined) {
            return num1 === num2;
        } else {
            return Math.round(num1 * Math.pow(10, precisionDigits))
                === Math.round(num2 * Math.pow(10, precisionDigits));
        }
    }


    public static getEWString(angle: Angle, digits: number): string {
        const angleValue = StringnumberService.roundToDigits(angle.deg, digits);

        if (angleValue > 0) {
            return angleValue.toString() + '° E';
        } else {
            return Math.abs(angleValue).toString() + '° W';
        }
    }


    public static getDmsString(lonLat: [number, number]): string {
        let latString = StringnumberService.getCoordString(lonLat[1]);
        if (lonLat[1] >= 0) {
            latString += ' N';
        } else {
            latString += ' S';
        }

        let lonString = StringnumberService.getCoordString(lonLat[0]);
        if (lonLat[0] >= 0) {
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

        return d + '° ' + StringnumberService.zeroPad(m) + '\' ' + StringnumberService.zeroPad(s) + '\"';
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
