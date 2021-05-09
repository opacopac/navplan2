<?php declare(strict_types=1);

namespace Navplan\Airspace\DbModel;

use Navplan\Airspace\DomainModel\Airspace;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Ring2d;
use Navplan\System\DomainModel\IDbResult;


class DbAirspaceConverter {
    public static function fromDbResult(IDbResult $result, float $pixelResolutionDeg): array
    {
        $airspaces = [];
        while ($row = $result->fetch_assoc()) {
            $airspaces[] = self::fromDbRow($row, $pixelResolutionDeg);
        }
        return $airspaces;
    }


    public static function fromDbRow(array $row, float $pixelResolutionDeg): Airspace {
        return new Airspace(
            intval($row["id"]),
            intval($row["aip_id"]),
            $row["category"],
            $row["country"],
            $row["name"],
            new Altitude(
                intval($row["alt_bottom_height"]),
                AltitudeUnit::fromString($row["alt_bottom_unit"]),
                AltitudeReference::fromString($row["alt_bottom_reference"])
            ),
            new Altitude(
                intval($row["alt_top_height"]),
                AltitudeUnit::fromString($row["alt_top_unit"]),
                AltitudeReference::fromString($row["alt_top_reference"])
            ),
            Ring2d::createFromString($row["polygon"])
        );
    }
}
