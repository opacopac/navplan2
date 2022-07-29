<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\ShortAirport;
use Navplan\Common\DbModel\DbPosition2dConverter;


class DbShortAirportConverter {
    public static function fromDbRow(array $row): ShortAirport {
        return new ShortAirport(
            intval($row[DbTableAirport::COL_ID]),
            $row[DbTableAirport::COL_TYPE],
            $row[DbTableAirport::COL_ICAO],
            DbPosition2dConverter::fromDbRow($row),
            is_null(intval($row[DbTableAirportRunway::COL_DIRECTION])) ? null : intval($row[DbTableAirportRunway::COL_DIRECTION]),
            $row[DbTableAirportRunway::COL_SURFACE],
            $row["features"] ? explode(",", $row["features"]) : []
        );
    }
}
