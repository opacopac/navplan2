<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;

use Navplan\Aerodrome\DomainModel\Airport;
use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;


class DbAirportConverter {
    public static function fromDbRow(array $row): Airport {
        return new Airport(
            intval($row["id"]),
            $row["type"],
            $row["name"],
            $row["icao"] !== "" ? $row["icao"] : NULL,
            $row["country"],
            DbPosition2dConverter::fromDbRow($row),
            new Length(floatval($row["elevation"]), LengthUnit::M),
            [],
            [],
            [],
            [],
            []
        );
    }
}
