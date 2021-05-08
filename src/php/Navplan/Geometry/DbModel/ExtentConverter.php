<?php declare(strict_types=1);

namespace Navplan\Geometry\DbModel;

use Navplan\Geometry\DomainModel\Extent;


class ExtentConverter {
    public static function toWktPolygon(Extent $extent, bool $wrapFromText = true): string {
        return Ring2dConverter::toWktPolygon($extent->toRing2d(), $wrapFromText);
    }
}
