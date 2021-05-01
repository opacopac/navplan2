<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerModel;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;


class OgnTrafficFilterConverter {
    public static function fromDbResult(array $rs): OgnTrafficFilter {
        return new OgnTrafficFilter(
            new Extent(
                new Position2d(floatval($rs["minLon"]), floatval($rs["minLat"])),
                new Position2d(floatval($rs["maxLon"]), floatval($rs["maxLat"]))
            ),
            strtotime($rs["lastModified"])
        );
    }
}
