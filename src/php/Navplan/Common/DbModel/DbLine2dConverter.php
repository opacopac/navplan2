<?php declare(strict_types=1);

namespace Navplan\Common\DbModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Line2d;


class DbLine2dConverter {
    private const WKT_LINESTRING_REGEXP = '/LINESTRING\((.+)\)/i';
    private const WKT_MULTILINESTRING_REGEXP = '/MULTILINESTRING\((.+)\)/i';
    private const WKT_MULTICOORDPAIR_REGXEP = '/\(([^\(\)]+?)\)/';


    // e.g. to LINESTRING(0 0,0 10,10 0) or (LineFromText('LINESTRING(0 0,0 10,10 0)'))
    public static function toWktLineString(Line2d $line2d, bool $wrapFromText = true): string {
        $wkt = "LINESTRING(" . DbPosition2dConverter::toWktCoordinatePairList($line2d->position2dList) . ")";

        if ($wrapFromText) {
            return "(LineFromText('" . $wkt . "'))";
        } else {
            return $wkt;
        }
    }


    // e.g. to MULTILINESTRING((10 48,10 21,10 0),(16 0,16 23,16 48)) or (MLineFromText('MULTILINESTRING((10 48,10 21,10 0),(16 0,16 23,16 48))'))
    public static function toWktMultilineString(array $line2dList, bool $wrapFromText = true): string {
        $wkt = "MULTILINESTRING((" . join(
                "),(",
                array_map(
                    function (Line2d $line) { return DbPosition2dConverter::toWktCoordinatePairList($line->position2dList); },
                    $line2dList
                )
            )
            . "))";

        if ($wrapFromText) {
            return "(MLineFromText('" . $wkt . "'))";
        } else {
            return $wkt;
        }
    }


    // e.g. from LINESTRING(0 0,0 10,10 0)
    public static function fromWktLineString(string $wktLineString): Line2d {
        $result = preg_match(self::WKT_LINESTRING_REGEXP, $wktLineString, $matches);
        if (!$result) {
            throw new InvalidArgumentException("no linestring match found in string " . $wktLineString);
        }

        $pos2dList = DbPosition2dConverter::fromWktCoordinatePairList($matches[1]);

        return new Line2d($pos2dList);
    }


    // e.g. from MULTILINESTRING((10 48,10 21,10 0),(16 0,16 23,16 48))
    public static function fromWktMultiLineString(string $wktMultiLineString): array {
        $result = preg_match(self::WKT_MULTILINESTRING_REGEXP, $wktMultiLineString, $matches);
        if (!$result) {
            throw new InvalidArgumentException("no multilinestring match found in string " . $wktMultiLineString);
        }

        $result2 = preg_match_all(self::WKT_MULTICOORDPAIR_REGXEP, $matches[1], $matches2);
        if (!$result2) {
            throw new InvalidArgumentException("no multilinestring match found in string " . $wktMultiLineString);
        }

        return array_map(
            function (string $coordPairList) {
                $pos2dList = DbPosition2dConverter::fromWktCoordinatePairList($coordPairList);
                return new Line2d($pos2dList);
            },
            $matches2[1]
        );
    }
}
