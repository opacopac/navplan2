<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Model\Waypoint;
use Navplan\Flightroute\Domain\Model\WaypointAltitude;
use Navplan\System\DomainModel\IDbResult;


class DbWaypointConverter {
    public static function fromDbRow(array $row): Waypoint {
        return new Waypoint(
            $row["type"],
            $row["freq"],
            $row["callsign"],
            $row["checkpoint"],
            "",
            "",
            new WaypointAltitude(
                $row["alt"] ? new Altitude(
                    intval($row["alt"]),
                    AltitudeUnit::FT,
                    AltitudeReference::MSL
                ) : NULL,
                intval($row["isminalt"]) === 1,
                intval($row["ismaxalt"]) === 1,
                intval($row["isaltatlegstart"]) === 1,
            ),
            "",
            $row["remark"],
            StringNumberHelper::parseStringOrNull($row, "supp_info"),
            DbPosition2dConverter::fromDbRow($row),
            StringNumberHelper::parseStringOrNull($row, "airport_icao"),
        intval($row["is_alternate"]) === 1
        );
    }


    /**
     * @param IDbResult $dbResult
     * @return Waypoint[]
     */
    public static function fromDbResult(IDbResult $dbResult): array {
        $waypoints = [];
        while ($row = $dbResult->fetch_assoc()) {
            $waypoints[] = self::fromDbRow($row);
        }

        return $waypoints;
    }
}
