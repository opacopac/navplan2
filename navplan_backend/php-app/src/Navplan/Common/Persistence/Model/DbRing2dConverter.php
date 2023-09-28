<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Ring2d;


class DbRing2dConverter {
    public static function toWktPolygon(Ring2d $ring2d, bool $wrapFromText = true): string {
        $wkt = "POLYGON((" . DbPosition2dConverter::toWktCoordinatePairList($ring2d->position2dList) . "))";

        if ($wrapFromText) {
            return "(ST_GeomFromText('" . $wkt . "'))";
        } else {
            return $wkt;
        }
    }
}
