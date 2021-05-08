<?php declare(strict_types=1);

namespace Navplan\Airspace\DbModel;

use Navplan\Airspace\DomainModel\Airspace;
use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Ring2d;
use Navplan\System\DomainModel\IDbResult;


class DbAirspaceConverter {
    public static function fromResultList(IDbResult $result, float $pixelResolutionDeg): array
    {
        $airspaces = [];
        while ($rs = $result->fetch_assoc()) {
            $airspaces[] = self::fromResult($rs, $pixelResolutionDeg);
        }
        return $airspaces;
    }


    public static function fromResult(array $rs, float $pixelResolutionDeg): Airspace {
        return new Airspace(
            intval($rs["id"]),
            intval($rs["aip_id"]),
            $rs["category"],
            $rs["country"],
            $rs["name"],
            new Altitude(
                intval($rs["alt_bottom_height"]),
                AltitudeUnit::fromString($rs["alt_bottom_unit"]),
                AltitudeReference::fromString($rs["alt_bottom_reference"])
            ),
            new Altitude(
                intval($rs["alt_top_height"]),
                AltitudeUnit::fromString($rs["alt_top_unit"]),
                AltitudeReference::fromString($rs["alt_top_reference"])
            ),
            Ring2d::createFromString($rs["polygon"])
        );
    }
}
