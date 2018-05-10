<?php


class GeoService {
    public static function simplifyPolygon($polygonPoints, $epsilon) {
        $numPoints = count($polygonPoints);
        if ($numPoints <= 3) {
            return $polygonPoints;
        }

        // find most distant point from first point
        $distMax = 0;
        $mostDistantPointIndex = 1;
        for ($i = 1; $i < $numPoints - 1; $i++) {
            $dist = self::calcDistance($polygonPoints[0], $polygonPoints[$i]);
            if ($dist >= $distMax) {
                $distMax = $dist;
                $mostDistantPointIndex = $i;
            }
        }

        // simplify polygon as 2 separate lines
        $subLine1 = self::simplifyLine(array_slice($polygonPoints, 0, $mostDistantPointIndex + 1), $epsilon);
        $subLine2 = self::simplifyLine(array_slice($polygonPoints, $mostDistantPointIndex), $epsilon);

        return array_merge($subLine1, array_slice($subLine2, 1));
    }


    public static function simplifyMultipolygon($polygonList, $epsilon) {
        $simplePolygonList = [];
        foreach ($polygonList as $polygon) {
            $simplePolygonList[] = self::simplifyPolygon($polygon, $epsilon);
        }
        return $simplePolygonList;
    }


    public static function simplifyLine($linePoints, $epsilon) {
        $numPoints = count($linePoints);
        if ($numPoints <= 2) {
            return $linePoints;
        }

        $distMax = 0;
        $mostDistantPointIndex = 1;
        for ($i = 1; $i < $numPoints - 1; $i++) {
            $dist = self::calcPerpendicularDistance($linePoints[0], $linePoints[$numPoints - 1], $linePoints[$i]);
            if ($dist >= $distMax) {
                $distMax = $dist;
                $mostDistantPointIndex = $i;
            }
        }

        if ($distMax > $epsilon) {
            $subLine1 = self::simplifyLine(array_slice($linePoints, 0, $mostDistantPointIndex + 1), $epsilon);
            $subLine2 = self::simplifyLine(array_slice($linePoints, $mostDistantPointIndex), $epsilon);
            return array_merge($subLine1, array_slice($subLine2, 1));
        } else {
            return [$linePoints[0], $linePoints[$numPoints - 1]];
        }
    }


    public static function calcDistance($pointA, $pointB) {
        return sqrt(pow($pointB[0] - $pointA[0], 2) + pow($pointB[1] - $pointA[1], 2));
    }


    public static function calcPerpendicularDistance($linePointA, $linePointB, $distPointC) {
        $x1 = $linePointA[0];
        $y1 = $linePointA[1];
        $x2 = $linePointB[0];
        $y2 = $linePointB[1];
        $x0 = $distPointC[0];
        $y0 = $distPointC[1];
        $dx = $x2 - $x1;
        $dy = $y2 - $y1;

        if ($dx == 0 && $dy == 0) {
            return sqrt(pow($x1 - $x0, 2) + pow($y1 - $y0, 2));
        }

        return abs($dy * $x0 - $dx * $y0 + $x2 * $y1 - $y2 * $x1) / sqrt($dy * $dy + $dx * $dx);
    }


    public static function calcDegPerPixelByZoom($zoom, $tileWidthPixel = 256) {
        return 360.0 / (pow(2, $zoom) * $tileWidthPixel);
    }


    public static function calcGeoHash($longitude, $latitude, $maxZoomLevel) {
        $minLon = -180.0;
        $minLat = -90.0;
        $maxLon = 180.0;
        $maxLat = 90.0;

        $geoHash = "";
        for ($zoom = 0; $zoom <= $maxZoomLevel; $zoom++) {
            $midLon = ($minLon + $maxLon) / 2;
            $midLat = ($minLat + $maxLat) / 2;

            if ($longitude < $midLon) {
                if ($latitude < $midLat) {
                    $geoHash .= "a"; // SW
                    $maxLat = $midLat;
                } else {
                    $geoHash .= "b"; // NW
                    $minLat = $midLat;
                }
                $maxLon = $midLon;
            } else {
                if ($latitude < $midLat) {
                    $geoHash .= "c"; // SE
                    $maxLat = $midLat;
                } else {
                    $geoHash .= "d"; // NE
                    $minLat = $midLat;
                }
                $minLon = $midLon;
            }
        }

        return $geoHash;
    }


    public static function parsePolygonFromString($polygonString, $roundToDigits = 6, $pointDelimiter = ",", $xyDelimiter = " ") {
        $polygon = [];
        $coord_pairs = explode($pointDelimiter, $polygonString);

        foreach ($coord_pairs as $latlon) {
            $coords = explode($xyDelimiter, trim($latlon));
            self::reduceCoordinateAccuracy($coords, $roundToDigits);

            $polygon[] = $coords;
        }

        return $polygon;
    }


    public static function joinPolygonToString($polygon, $pointDelimiter = ",", $xyDelimiter = " ") {
        $coordPairStrings = [];
        foreach ($polygon as $coordPair) {
            $coordPairStrings[] = join($xyDelimiter, $coordPair);
        }

        return join($pointDelimiter, $coordPairStrings);
    }


    public static function reduceCoordinateAccuracy(&$coordPair, $roundToDigits = 6) {
        $coordPair[0] = round($coordPair[0], $roundToDigits);
        $coordPair[1] = round($coordPair[1], $roundToDigits);
    }


    public static function reducePolygonAccuracy(&$polygon, $roundToDigits = 6) {
        foreach ($polygon as &$coordPair) {
            self::reduceCoordinateAccuracy($coordPair, $roundToDigits);
        }
    }


    public static function reduceMultiPolygonAccuracy(&$multiPolygon, $roundToDigits = 6) {
        foreach ($multiPolygon as &$polygon) {
            foreach ($polygon as &$coordPair) {
                self::reduceCoordinateAccuracy($coordPair, $roundToDigits);
            }
        }
    }
}
