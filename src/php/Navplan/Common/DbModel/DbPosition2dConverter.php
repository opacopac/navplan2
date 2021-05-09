<?php declare(strict_types=1);

namespace Navplan\Common\DbModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\StringNumberHelper;


class DbPosition2dConverter {
    private const DECIMAL_REGEXP_PART = '([\-\+]?\d+\.?\d*)';
    private const WKT_COORD_PAIR_REGEXP = '/' . self::DECIMAL_REGEXP_PART . '\s+' . self::DECIMAL_REGEXP_PART . '/im';
    private const WKT_POINT_REGEXP = '/POINT\(\s*' . self::DECIMAL_REGEXP_PART . '\s+' . self::DECIMAL_REGEXP_PART . '\s*\)/im';


    // e.g. -76.867 38.8108
    public static function toWktCoordinatePair(Position2d $position2d): string {
        return $position2d->longitude . " " . $position2d->latitude;
    }


    // e.g. 10 10,20 10,20 20,10 20,10 10
    public static function toWktCoordinatePairList(array $position2dList): string {
        return join(",", array_map(
            function (Position2d $pos) { return self::toWktCoordinatePair($pos); },
            $position2dList
        ));
    }


    // e.g. POINT(-76.867 38.8108) or (PointFromText('POINT(10 10)'))
    public static function toWktPoint(Position2d $position2d, bool $wrapFromText = true): string {
        $wkt = "POINT(" . self::toWktCoordinatePair($position2d) . ")";

        if ($wrapFromText) {
            return "(PointFromText('" . $wkt . "'))";
        } else {
            return $wkt;
        }
    }


    public static function fromDbRow(array $row, string $lonColName = 'longitude', string $latColName = 'latitude'): ?Position2d {
        if (StringNumberHelper::isNullOrEmpty($row, $lonColName) || StringNumberHelper::isNullOrEmpty($row, $latColName)) {
            return null;
        }

        return new Position2d(
            floatval($row[$lonColName]),
            floatval($row[$latColName])
        );
    }


    // e.g. -76.867 38.8108
    public static function fromWktCoordinatePair(string $wktCoordPairString): Position2d {
        $result = preg_match(self::WKT_COORD_PAIR_REGEXP, $wktCoordPairString, $matches);

        if (!$result) {
            throw new InvalidArgumentException("no coordinate pair found in string " . $wktCoordPairString);
        }

        return new Position2d(floatval($matches[1]), floatval($matches[2]));
    }


    public static function fromWktCoordinatePairList(string $wktCoordPairListString): array {
        $pairs = explode(",", $wktCoordPairListString);

        if (count($pairs) == 0) {
            throw new InvalidArgumentException("no coordinate pair list found in string " . $wktCoordPairListString);
        }

        return array_map(
            function (string $wktCoordPairString) { return self::fromWktCoordinatePair($wktCoordPairString); },
            $pairs
        );
    }


    // e.g. POINT(-76.867 38.8108)
    public static function fromWktPoint(string $wkrPointString): Position2d {
        $result = preg_match(self::WKT_POINT_REGEXP, $wkrPointString, $matches);

        if (!$result) {
            throw new InvalidArgumentException("no point match found in string " . $wkrPointString);
        }

        return new Position2d(floatval($matches[1]), floatval($matches[2]));
    }
}
