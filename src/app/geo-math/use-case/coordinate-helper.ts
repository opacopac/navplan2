import {Position2d} from '../domain/geometry/position2d';


export class CoordinateHelper {
    public static tryParseCoordinates(queryString: string): Position2d {
        const gradMinSecPattern = /^(\d+)\D+(\d+)\D+([\d\.]+)(\D+)(\d+)\D+(\d+)\D+([\d\.]+)(\D*)$/i;
        const decGradPattern = /^([+-]?\d+\.\d+)[^\d\.+-]+([+-]?\d+\.\d+)$/i;
        const notamPattern = /^(\d{2})(\d{2})(\d{2})([NS])\s?(\d{2,3})(\d{2})(\d{2})([EW])$/i; // 463447N0062121E, 341640N0992240W
        const matchGradMinSec = gradMinSecPattern.exec(queryString);
        const matchDecGrad = decGradPattern.exec(queryString);
        const matchNotam = notamPattern.exec(queryString);

        if (matchGradMinSec != null || matchDecGrad != null || matchNotam != null) {
            let lonLat: Position2d;

            if (matchGradMinSec != null) {
                lonLat = CoordinateHelper.calcLonLatFromGradMinSec(matchGradMinSec[1], matchGradMinSec[2], matchGradMinSec[3],
                    matchGradMinSec[4], matchGradMinSec[5], matchGradMinSec[6], matchGradMinSec[7], matchGradMinSec[8]);
            } else if (matchDecGrad != null) {
                lonLat = new Position2d(parseFloat(matchDecGrad[2]), parseFloat(matchDecGrad[1]));
            } else if (matchNotam != null) {
                lonLat = CoordinateHelper.calcLonLatFromGradMinSec(matchNotam[1], matchNotam[2], matchNotam[3],
                    matchNotam[4], matchNotam[5], matchNotam[6], matchNotam[7], matchNotam[8]);
            }

            return lonLat;
        }
    }


    public static calcLonLatFromGradMinSec(
        latGrad: string, latMin: string, latSec: string, latDir: string,
        lonGrad: string, lonMin: string, lonSec: string, lonDir: string
    ): Position2d {
        const latG = parseInt(latGrad, 10);
        const latM = parseInt(latMin, 10);
        const latS = parseFloat(latSec);
        let lat = latG + latM / 60 + latS / 3600;
        if (latDir.toUpperCase().indexOf('S') >= 0) {
            lat = -lat;
        }

        const lonG = parseInt(lonGrad, 10);
        const lonM = parseInt(lonMin, 10);
        const lonS = parseFloat(lonSec);
        let lon = lonG + lonM / 60 + lonS / 3600;
        if (lonDir.toUpperCase().indexOf('W') >= 0) {
            lon = -lon;
        }

        return new Position2d(lon, lat);
    }
}
