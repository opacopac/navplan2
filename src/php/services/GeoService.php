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

        return abs($dy * $x0 - $dx * $y0 + $x2 * $y1 - $y2 * $x1) / sqrt($dy * $dy + $dx * $dx);
    }


    public static function calcDegPerPixelByZoom($zoom, $tileWidthPixel = 256) {
        return 360.0 / (pow(2, $zoom) * $tileWidthPixel);
    }


    public static function calcGeoHash($longitude, $latitude, $maxZoomLevel) {
        $minLon = -90.0;
        $minLat = -180.0;
        $maxLon = 90.0;
        $maxLat = 180.0;

        $geoHash = "";
        for ($zoom = 0; $zoom <= $maxZoomLevel; $zoom++) {
            $midLon = ($minLon + $maxLon) / 2;
            $midLat = ($minLat + $maxLat) / 2;

            /*print "lon: " . $longitude . "<br>\n";
            print "lat: " . $latitude . "<br>\n";
            print "minlon: " . $minLon . "<br>\n";
            print "minlat: " . $minLat . "<br>\n";
            print "midlon: " . $midLon . "<br>\n";
            print "midlat: " . $midLat . "<br>\n";
            print "maxlon: " . $maxLon . "<br>\n";
            print "maxlat: " . $maxLat . "<br>\n";*/

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


            /*print "geohash: " . $geoHash . "<br>\n";
            print "<br><br>\n\n";*/
        }

        return $geoHash;
    }


    public static function parsePolygonFromString($polygonString, $roundToDigits = 6, $pointDelimiter = ",", $xyDelimiter = " ") {
        $polygon = [];
        $coord_pairs = explode($pointDelimiter, $polygonString);

        foreach ($coord_pairs as $latlon) {
            $coords = explode($xyDelimiter, trim($latlon));
            $coords[0] = round($coords[0], $roundToDigits);
            $coords[1] = round($coords[1], $roundToDigits);

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
}
