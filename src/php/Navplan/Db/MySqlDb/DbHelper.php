<?php declare(strict_types=1);

namespace Navplan\Db\MySqlDb;

use InvalidArgumentException;
use Navplan\Db\DomainService\IDbService;
use Navplan\Geometry\DomainModel\Extent;


class DbHelper {
    public static function getStringValue(IDbService $dbService, ?string $value, string $nullValue = 'NULL'): string {
        if ($value === NULL) {
            return $nullValue;
        } else {
            return "'" . $dbService->escapeString($value) . "'";
        }
    }


    public static function getIntValue(?int $value, string $nullValue = 'NULL'): string {
        if ($value === NULL) {
            return $nullValue;
        } else {
            return "'" . $value . "'";
        }
    }


    public static function getFloatValue(?float $value, string $nullValue = 'NULL'): string {
        if ($value === NULL) {
            return $nullValue;
        } else {
            return "'" . $value . "'";
        }
    }


    public static function getBoolValue(?bool $value, string $nullValue = 'NULL'): string {
        if ($value === NULL) {
            return $nullValue;
        } else if ($value === TRUE) {
            return "'1'";
        } else {
            return "'0'";
        }
    }


    public static function getDbUtcTimeString(int $timestampSec): string {
        if ($timestampSec < -2147483648 || $timestampSec > 2147483647) {
            throw new InvalidArgumentException('unix timestamp [s] is not in correct range');
        }

        return gmdate("Y-m-d H:i:s", $timestampSec);
    }


    public static function getDbExtentPolygon(float $minLon, float $minLat, float $maxLon, float $maxLat): string
    {
        return "ST_GeomFromText('POLYGON((" . $minLon . " " . $minLat . "," . $maxLon . " " . $minLat . "," . $maxLon . " " . $maxLat . "," . $minLon . " " . $maxLat . "," . $minLon . " " . $minLat . "))')";
    }


    public static function getDbExtentPolygon2(Extent $extent): string
    {
        return "ST_GeomFromText('POLYGON((" .
            $extent->minPos->longitude . " " . $extent->minPos->latitude . "," .
            $extent->maxPos->longitude . " " . $extent->minPos->latitude . "," .
            $extent->maxPos->longitude . " " . $extent->maxPos->latitude . "," .
            $extent->minPos->longitude . " " . $extent->maxPos->latitude . "," .
            $extent->minPos->longitude . " " . $extent->minPos->latitude . "))')";
    }


    public static function getDbPolygonString(array $lonLatList): string
    {
        $lonLatStrings = [];

        foreach ($lonLatList as $lonLat)
            $lonLatStrings[] = join(" ", $lonLat);

        if ($lonLatStrings[0] != $lonLatStrings[count($lonLatStrings) - 1]) // close polygon if necessary
            $lonLatStrings[] = $lonLatStrings[0];

        $polyString = "ST_GeomFromText('POLYGON((" . join(",", $lonLatStrings) . "))')";

        return $polyString;
    }


    public static function getDbMultiPolygonString(array $polygonList): string
    {
        $polyStrings = [];
        foreach ($polygonList as $polygon) {
            $lonLatStrings = [];
            foreach ($polygon as $lonLat)
                $lonLatStrings[] = join(" ", $lonLat);

            if ($lonLatStrings[0] != $lonLatStrings[count($lonLatStrings) - 1]) // close polygon if necessary
                $lonLatStrings[] = $lonLatStrings[0];

            $polyStrings[] = "((" . join(",", $lonLatStrings) . "))";
        }

        $multiPolyString = "ST_GeomFromText('MULTIPOLYGON(" . join(",", $polyStrings) . ")')";

        return $multiPolyString;
    }


    // retrieve lon lat from the format: POINT(-76.867 38.8108)
    public static function parseLonLatFromDbPoint(string $dbPointString): ?array
    {
        $decimalRegExpPart = '([\-\+]?\d+\.?\d*)';
        $dbPointRegexp = '/POINT\(\s*' . $decimalRegExpPart . '\s+' . $decimalRegExpPart . '\s*\)/im';

        $result = preg_match($dbPointRegexp, $dbPointString, $matches);

        if (!$result)
            return null;

        $lonLat = [floatval($matches[1]), floatval($matches[2])];

        return $lonLat;
    }


    public static function getDbPointStringFromLonLat(array $lonLat): string
    {
        return "ST_GeomFromText('POINT(" . $lonLat[0] . " " . $lonLat[1] . ")')";
    }
}
