<?php declare(strict_types=1);

namespace Navplan\Geometry\DbModel;

use Navplan\Geometry\DomainModel\Ring2d;


class Ring2dConverter {
    public static function toWktPolygon(Ring2d $ring2d, bool $wrapFromText = true): string {
        $wkt = "POLYGON((" . Position2dConverter::toWktCoordinatePairList($ring2d->position2dList) . "))";

        if ($wrapFromText) {
            return "(ST_GeomFromText('" . $wkt . "'))";
        } else {
            return $wkt;
        }
    }
}
