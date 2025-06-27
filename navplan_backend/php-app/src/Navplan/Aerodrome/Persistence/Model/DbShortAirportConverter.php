<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\ShortAirport;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\System\Domain\Model\IDbResult;


class DbShortAirportConverter
{
    public static function fromDbRow(array $row): ShortAirport
    {
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


    /**
     * @param IDbResult $result
     * @return ShortAirport[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $airports = [];

        while ($row = $result->fetch_assoc()) {
            $airports[] = DbShortAirportConverter::fromDbRow($row);
        }

        return $airports;
    }
}
