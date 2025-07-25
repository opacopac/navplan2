<?php declare(strict_types=1);

namespace Navplan\System\Db\MySql;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Service\IDbService;


class DbHelper
{
    public static function getDbStringValue(IDbService $dbService, ?string $value, string $nullValue = 'NULL'): string
    {
        if ($value === NULL) {
            return $nullValue;
        } else {
            return "'" . $dbService->escapeString($value) . "'";
        }
    }


    public static function getDbIntValue(?int $value, string $nullValue = 'NULL'): string
    {
        if ($value === NULL) {
            return $nullValue;
        } else {
            return "'" . $value . "'";
        }
    }


    public static function getDbFloatValue(?float $value, string $nullValue = 'NULL'): string
    {
        if ($value === NULL) {
            return $nullValue;
        } else {
            return "'" . $value . "'";
        }
    }


    public static function getDbBoolValue(?bool $value, string $nullValue = 'NULL'): string
    {
        if ($value === NULL) {
            return $nullValue;
        } else if ($value === TRUE) {
            return "'1'";
        } else {
            return "'0'";
        }
    }


    public static function getDbUtcTimeString(int $timestampSec): string
    {
        /*if ($timestampSec < -2147483648 || $timestampSec > 2147483647) {
            throw new InvalidArgumentException('unix timestamp [s] is not in correct range');
        }*/

        return gmdate("Y-m-d H:i:s", $timestampSec);
    }


    public static function getDbPointString(Position2d $position): string
    {
        return "ST_PointFromText('POINT(" . $position->longitude . " " . $position->latitude . ")')";
    }


    /**
     * @param Line2d|Position2d[] $line
     * @return string
     */
    public static function getDbLineString(Line2d|array $line): string
    {
        $posList = $line instanceof Line2d ? $line->position2dList : $line;

        $lonLatStrings = [];
        foreach ($posList as $position) {
            $lonLatStrings[] = $position->toString();
        }

        return "ST_LineFromText('LINESTRING(" . join(",", $lonLatStrings) . ")')";
    }


    /**
     * @param Ring2d|Extent2d|array{0: float, 1: float}[] $poly
     * @return string
     */
    public static function getDbPolygonString(Ring2d|Extent2d|array $poly): string
    {
        $posList = match (true) {
            $poly instanceof Ring2d => $poly->toArray(),
            $poly instanceof Extent2d => $poly->toRing2d()->toArray(),
            is_array($poly) => $poly,
            default => throw new InvalidArgumentException("Unsupported polygon type: " . gettype($poly)),
        };

        $lonLatStrings = [];
        foreach ($posList as $lonLat) {
            $lonLatStrings[] = join(" ", $lonLat);
        }

        // close polygon if necessary
        if ($lonLatStrings[0] != $lonLatStrings[count($lonLatStrings) - 1]) {
            $lonLatStrings[] = $lonLatStrings[0];
        }

        return "ST_PolyFromText('POLYGON((" . join(",", $lonLatStrings) . "))')";
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

        return "ST_GeomFromText('MULTIPOLYGON(" . join(",", $polyStrings) . ")')";
    }


    // retrieve lon lat from the format: POINT(-76.867 38.8108)
    public static function parseLonLatFromDbPoint(string $dbPointString): ?Position2d
    {
        $decimalRegExpPart = '([\-\+]?\d+\.?\d*)';
        $dbPointRegexp = '/POINT\(\s*' . $decimalRegExpPart . '\s+' . $decimalRegExpPart . '\s*\)/im';

        $result = preg_match($dbPointRegexp, $dbPointString, $matches);

        if (!$result)
            return null;

        return new Position2d(floatval($matches[1]), floatval($matches[2]));
    }
}
