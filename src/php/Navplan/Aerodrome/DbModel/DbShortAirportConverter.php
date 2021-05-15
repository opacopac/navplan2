<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;

use Navplan\Aerodrome\DomainModel\ShortAirport;
use Navplan\Common\DbModel\DbPosition2dConverter;


class DbShortAirportConverter {
    public static function fromDbRow(array $row): ShortAirport {
        return new ShortAirport(
            intval($row["id"]),
            $row["type"],
            $row["icao"],
            DbPosition2dConverter::fromDbRow($row),
            is_null(intval($row["direction1"])) ? null : intval($row["direction1"]),
            $row["surface"],
            explode(",", $row["features"] ?: "")
        );
    }
}
