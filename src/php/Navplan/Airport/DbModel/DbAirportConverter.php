<?php declare(strict_types=1);

namespace Navplan\Airport\DbModel;

use Navplan\Airport\DomainModel\Airport;
use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\Position2d;


class DbAirportConverter {
    public static function fromDbResult(array $rs): Airport {
        return new Airport(
            intval($rs["id"]),
            $rs["type"],
            $rs["name"],
            $rs["icao"] !== "" ? $rs["icao"] : NULL,
            $rs["country"],
            new Position2d(floatval($rs["longitude"]), floatval($rs["latitude"])),
            new Length(floatval($rs["elevation"]), LengthUnit::M),
            [],
            [],
            [],
            [],
            []
        );
    }
}
