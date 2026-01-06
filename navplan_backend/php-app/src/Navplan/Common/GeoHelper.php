<?php namespace Navplan\Common;

use Navplan\Common\Domain\Model\Angle;
use Navplan\Common\Domain\Model\AngleUnit;
use Navplan\Common\Domain\Model\Circle2d;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\LineInterval2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;


class GeoHelper
{
    private const EARTH_RADIUS_M = 6371000;

    public static function getDecFromDms(string $nsew, int $deg, int $min, float $sec): float
    {
        $sign = (strtoupper($nsew) === "N" || strtoupper($nsew) === "E") ? 1 : -1;

        return $sign * ($deg + $min / 60 + $sec / 3600);
    }


    public static function calcHaversineDistance(Position2d $pos1, Position2d $pos2): Length
    {
        $radE = self::EARTH_RADIUS_M;
        $phi1 = Angle::convert($pos1->latitude, AngleUnit::DEG, AngleUnit::RAD);
        $phi2 = Angle::convert($pos2->latitude, AngleUnit::DEG, AngleUnit::RAD);
        $dphi = Angle::convert($pos2->latitude - $pos1->latitude, AngleUnit::DEG, AngleUnit::RAD);
        $dlambda = Angle::convert($pos2->longitude - $pos1->longitude, AngleUnit::DEG, AngleUnit::RAD);

        $a = sin($dphi / 2) * sin($dphi / 2) + cos($phi1) * cos($phi2) * sin($dlambda / 2) * sin($dlambda / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $d = $radE * $c;

        return new Length($d, LengthUnit::M);
    }


    public static function simplifyPolygon(array $polygonPoints, float $epsilon): array
    {
        $numPoints = count($polygonPoints);
        if ($numPoints <= 3) {
            return $polygonPoints;
        }

        // find most distant point from first point
        $distMax = 0;
        $mostDistantPointIndex = 1;
        for ($i = 1; $i < $numPoints - 1; $i++) {
            $dist = self::calcPseudoDistance($polygonPoints[0], $polygonPoints[$i]);
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


    public static function simplifyMultipolygon(array $polygonList, float $epsilon): array
    {
        $simplePolygonList = [];
        foreach ($polygonList as $polygon) {
            $simplePolygonList[] = self::simplifyPolygon($polygon, $epsilon);
        }
        return $simplePolygonList;
    }


    public static function simplifyLine(array $linePoints, float $epsilon): array
    {
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


    public static function calcPseudoDistance(array $pointA, array $pointB): float
    {
        return sqrt(pow($pointB[0] - $pointA[0], 2) + pow($pointB[1] - $pointA[1], 2));
    }


    public static function calcPerpendicularDistance(array $linePointA, array $linePointB, array $distPointC): float
    {
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


    public static function calcDegPerPixelByZoom(int $zoom, int $tileWidthPixel = 256): float
    {
        return 360.0 / (pow(2, $zoom) * $tileWidthPixel);
    }


    public static function calcGeoHash(Position2d $position, int $maxZoomLevel): string
    {
        $minLon = -180.0;
        $minLat = -90.0;
        $maxLon = 180.0;
        $maxLat = 90.0;

        $geoHash = "";
        for ($zoom = 0; $zoom <= $maxZoomLevel; $zoom++) {
            $midLon = ($minLon + $maxLon) / 2;
            $midLat = ($minLat + $maxLat) / 2;

            if ($position->longitude < $midLon) {
                if ($position->latitude < $midLat) {
                    $geoHash .= "a"; // SW
                    $maxLat = $midLat;
                } else {
                    $geoHash .= "b"; // NW
                    $minLat = $midLat;
                }
                $maxLon = $midLon;
            } else {
                if ($position->latitude < $midLat) {
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


    public static function parsePolygonFromString(string $polygonString, int $roundToDigits = 6, string $pointDelimiter = ",", string $xyDelimiter = " "): array
    {
        $polygon = [];
        $coord_pairs = explode($pointDelimiter, $polygonString);

        foreach ($coord_pairs as $latlon) {
            $coords = explode($xyDelimiter, trim($latlon));
            self::reduceCoordinateAccuracy($coords, $roundToDigits);

            $polygon[] = $coords;
        }

        return $polygon;
    }


    public static function joinPolygonToString(array $polygon, string $pointDelimiter = ",", string $xyDelimiter = " "): string
    {
        $coordPairStrings = [];
        foreach ($polygon as $coordPair) {
            $coordPairStrings[] = join($xyDelimiter, $coordPair);
        }

        return join($pointDelimiter, $coordPairStrings);
    }


    public static function reduceCoordinateAccuracy(&$coordPair, int $roundToDigits = 6): void
    {
        $coordPair[0] = round($coordPair[0], $roundToDigits);
        $coordPair[1] = round($coordPair[1], $roundToDigits);
    }


    public static function reducePolygonAccuracy(&$polygon, int $roundToDigits = 6): void
    {
        foreach ($polygon as &$coordPair) {
            self::reduceCoordinateAccuracy($coordPair, $roundToDigits);
        }
    }


    public static function reduceMultiPolygonAccuracy(&$multiPolygon, int $roundToDigits = 6): void
    {
        foreach ($multiPolygon as &$polygon) {
            foreach ($polygon as &$coordPair) {
                self::reduceCoordinateAccuracy($coordPair, $roundToDigits);
            }
        }
    }


    public static function moveBearDist(float $lat, float $lon, float $brngDeg, float $distM): array
    {
        $lat1 = deg2rad($lat);
        $lon1 = deg2rad($lon);
        $distNm = $distM / 1000.0 / 1.852;
        $angDist = ($distNm * 1.852) / 6378.1;

        $lat2 = asin(sin($lat1) * cos($angDist) + cos($lat1) * sin($angDist) * cos(deg2rad($brngDeg)));
        $lon2 = $lon1 + atan2(sin(deg2rad($brngDeg)) * sin($angDist) * cos($lat1), cos($angDist) - sin($lat1) * sin($lat2));

        return array(rad2deg($lon2), rad2deg($lat2));
    }


    public static function getCircleExtent(Circle2d $circle): array {
        $lat = $circle->center->latitude;
        $lon = $circle->center->longitude;
        $radiusM = $circle->radius->getM();
        $dlat = (self::moveBearDist($lat, $lon, 0, $radiusM)[1] - $lat);
        $dlon = (self::moveBearDist($lat, $lon, 90, $radiusM)[0] - $lon);

        $extent = [
            [$lon - $dlon, $lat - $dlat],
            [$lon - $dlon, $lat + $dlat],
            [$lon + $dlon, $lat + $dlat],
            [$lon + $dlon, $lat - $dlat],
            [$lon - $dlon, $lat - $dlat]
        ];

        return $extent;
    }


    public static function isPointInPolygon($point, $polygon): bool
    {
        $c = 0;
        $p1 = $polygon[0];
        $n = count($polygon);

        for ($i = 1; $i <= $n; $i++) {
            $p2 = $polygon[$i % $n];
            if ($point[0] > min($p1[0], $p2[0])
                && $point[0] <= max($p1[0], $p2[0])
                && $point[1] <= max($p1[1], $p2[1])
                && $p1[0] != $p2[0]) {
                $xinters = ($point[0] - $p1[0]) * ($p2[1] - $p1[1]) / ($p2[0] - $p1[0]) + $p1[1];
                if ($p1[1] == $p2[1] || $point[1] <= $xinters)
                    $c++;
            }
            $p1 = $p2;
        }

        // if the number of edges we passed through is even, then it's not in the poly.
        return $c % 2 != 0;
    }


    public static function calcLineIntersection(LineInterval2d $line1, LineInterval2d $line2): ?Position2d
    {
        $a1 = $line1->end->latitude - $line1->start->latitude;
        $b1 = $line1->start->longitude - $line1->end->longitude;
        $c1 = $a1 * $line1->start->longitude + $b1 * $line1->start->latitude;

        $a2 = $line2->end->latitude - $line2->start->latitude;
        $b2 = $line2->start->longitude - $line2->end->longitude;
        $c2 = $a2 * $line2->start->longitude + $b2 * $line2->start->latitude;

        $delta = $a1 * $b2 - $a2 * $b1;

        if ($delta == 0) {
            return NULL;
        }

        $lon = ($b2 * $c1 - $b1 * $c2) / $delta;
        $lat = ($a1 * $c2 - $a2 * $c1) / $delta;

        if ($lon < min($line1->start->longitude, $line1->end->longitude) ||
            $lon > max($line1->start->longitude, $line1->end->longitude) ||
            $lat < min($line1->start->latitude, $line1->end->latitude) ||
            $lat > max($line1->start->latitude, $line1->end->latitude) ||
            $lon < min($line2->start->longitude, $line2->end->longitude) ||
            $lon > max($line2->start->longitude, $line2->end->longitude) ||
            $lat < min($line2->start->latitude, $line2->end->latitude) ||
            $lat > max($line2->start->latitude, $line2->end->latitude)
        ) {
            return NULL;
        }

        return new Position2d($lon, $lat);
    }


    /**
     * Calculate initial bearing from pos1 to pos2
     */
    public static function calcBearing(Position2d $pos1, Position2d $pos2): Angle
    {
        $lat1 = deg2rad($pos1->latitude);
        $lat2 = deg2rad($pos2->latitude);
        $dLon = deg2rad($pos2->longitude - $pos1->longitude);

        $y = sin($dLon) * cos($lat2);
        $x = cos($lat1) * sin($lat2) - sin($lat1) * cos($lat2) * cos($dLon);
        $theta = atan2($y, $x);

        return new Angle(fmod((rad2deg($theta) + 360), 360), AngleUnit::DEG);
    }


    /**
     * Calculate destination position from start point, bearing, and distance
     */
    public static function calcDestination(Position2d $start, float $bearingDeg, Length $distance): Position2d
    {
        $phi1 = deg2rad($start->latitude);
        $lambda1 = deg2rad($start->longitude);
        $d_per_R = $distance->getValue(LengthUnit::M) / self::EARTH_RADIUS_M;

        $phi2 = asin(sin($phi1) * cos($d_per_R) + cos($phi1) * sin($d_per_R) * cos(deg2rad($bearingDeg)));
        $lambda2 = $lambda1 + atan2(
            sin(deg2rad($bearingDeg)) * sin($d_per_R) * cos($phi1),
            cos($d_per_R) - sin($phi1) * sin($phi2)
        );

        return new Position2d(rad2deg($lambda2), rad2deg($phi2));
    }


    /**
     * Create a rectangle polygon around a line segment with lateral offset of distance
     * and extended by distance before start and after end.
     */
    public static function getLineBox(Position2d $pos1, Position2d $pos2, Length $distance): Ring2d
    {
        $bearing = self::calcBearing($pos1, $pos2)->getValue(AngleUnit::DEG);
        $backBearing = fmod(($bearing + 180), 360);

        // Calculate perpendicular angles (left and right)
        $perpLeft = fmod(($bearing - 90 + 360), 360);
        $perpRight = fmod(($bearing + 90), 360);

        // Extend start point backward
        $pos1Back = self::calcDestination($pos1, $backBearing, $distance);
        $pos1Left = self::calcDestination($pos1Back, $perpLeft, $distance);
        $pos1Right = self::calcDestination($pos1Back, $perpRight, $distance);

        // Extend end point forward
        $pos2Fwd = self::calcDestination($pos2, $bearing, $distance);
        $pos2Left = self::calcDestination($pos2Fwd, $perpLeft, $distance);
        $pos2Right = self::calcDestination($pos2Fwd, $perpRight, $distance);

        // Return polygon as Ring2d
        return new Ring2d([
            $pos1Left,
            $pos1Right,
            $pos2Right,
            $pos2Left,
            $pos1Left
        ]);
    }


    /**
     * Create a box (square) around a point with specified distance in cardinal directions
     */
    public static function getPointBox(Position2d $pos, Length $distance): Ring2d
    {
        // Create a square around the point with distance in each cardinal direction
        $posNorth = self::calcDestination($pos, 0, $distance);
        $posEast = self::calcDestination($pos, 90, $distance);
        $posSouth = self::calcDestination($pos, 180, $distance);
        $posWest = self::calcDestination($pos, 270, $distance);

        // Return closed polygon (5 points: 4 corners + closing point)
        return new Ring2d([$posNorth, $posEast, $posSouth, $posWest, $posNorth]);
    }
}
