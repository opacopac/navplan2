<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\System\DomainService\IDbService;


class DbHelper {
    public static function getDbStringValue(IDbService $dbService, ?string $value, string $nullValue = 'NULL'): string {
        if ($value === NULL) {
            return $nullValue;
        } else {
            return "'" . $dbService->escapeString($value) . "'";
        }
    }


    public static function getDbIntValue(?int $value, string $nullValue = 'NULL'): string {
        if ($value === NULL) {
            return $nullValue;
        } else {
            return "'" . $value . "'";
        }
    }


    public static function getDbFloatValue(?float $value, string $nullValue = 'NULL'): string {
        if ($value === NULL) {
            return $nullValue;
        } else {
            return "'" . $value . "'";
        }
    }


    public static function getDbBoolValue(?bool $value, string $nullValue = 'NULL'): string {
        if ($value === NULL) {
            return $nullValue;
        } else if ($value === TRUE) {
            return "'1'";
        } else {
            return "'0'";
        }
    }


    public static function getDbUtcTimeString(int $timestampSec): string {
        /*if ($timestampSec < -2147483648 || $timestampSec > 2147483647) {
            throw new InvalidArgumentException('unix timestamp [s] is not in correct range');
        }*/

        return gmdate("Y-m-d H:i:s", $timestampSec);
    }


    public static function getDbExtentPolygon(float $minLon, float $minLat, float $maxLon, float $maxLat): string {
        return "ST_GeomFromText('POLYGON((" . $minLon . " " . $minLat . "," . $maxLon . " " . $minLat . ","
            . $maxLon . " " . $maxLat . "," . $minLon . " " . $maxLat . "," . $minLon . " " . $minLat . "))')";
    }


    public static function getDbExtentPolygon2(Extent2d $extent): string {
        return "ST_GeomFromText('POLYGON((" .
            $extent->minPos->longitude . " " . $extent->minPos->latitude . "," .
            $extent->maxPos->longitude . " " . $extent->minPos->latitude . "," .
            $extent->maxPos->longitude . " " . $extent->maxPos->latitude . "," .
            $extent->minPos->longitude . " " . $extent->maxPos->latitude . "," .
            $extent->minPos->longitude . " " . $extent->minPos->latitude . "))')";
    }


    /**
     * @param Position2d[] $positionList
     * @return string
     */
    public static function getDbLineString(array $positionList): string {
        $lonLatStrings = [];

        foreach ($positionList as $position) {
            $lonLatStrings[] = $position->toString();
        }

        $lineString = "ST_GeomFromText('LINESTRING(" . join(",", $lonLatStrings) . ")')";

        return $lineString;
    }


    public static function getDbPolygonString(array $lonLatList): string {
        $lonLatStrings = [];

        foreach ($lonLatList as $lonLat) {
            $lonLatStrings[] = join(" ", $lonLat);
        }

        // close polygon if necessary
        if ($lonLatStrings[0] != $lonLatStrings[count($lonLatStrings) - 1]) {
            $lonLatStrings[] = $lonLatStrings[0];
        }

        $polyString = "ST_GeomFromText('POLYGON((" . join(",", $lonLatStrings) . "))')";

        return $polyString;
    }


    public static function getDbMultiPolygonString(array $polygonList): string {
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
    public static function parseLonLatFromDbPoint(string $dbPointString): ?Position2d {
        $decimalRegExpPart = '([\-\+]?\d+\.?\d*)';
        $dbPointRegexp = '/POINT\(\s*' . $decimalRegExpPart . '\s+' . $decimalRegExpPart . '\s*\)/im';

        $result = preg_match($dbPointRegexp, $dbPointString, $matches);

        if (!$result)
            return null;

        return new Position2d(floatval($matches[1]), floatval($matches[2]));
    }


    public static function getDbPointStringFromPos(Position2d $position): string {
        return "ST_GeomFromText('POINT(" . $position->longitude . " " . $position->latitude . ")')";
    }


    public static function getPreparedInsertStatementQuery(string $tableName, string ...$colNames): string{
        $placeholders = array_fill(0, count($colNames), "?");

        return "INSERT INTO " . $tableName . " (" . join(", ", $colNames) . ") VALUES (" . join(", ", $placeholders) . ")";
    }
}
