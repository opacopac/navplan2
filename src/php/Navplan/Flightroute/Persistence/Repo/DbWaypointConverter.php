<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Repo;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Model\Waypoint;
use Navplan\Flightroute\Domain\Model\WaypointAltitude;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


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


    public static function toInsertSql(IDbService $dbService, Waypoint $waypoint, int $flightrouteId, int $sortOrder): string {
        $query = "INSERT INTO navplan_waypoints (navplan_id, sortorder, type, freq, callsign, checkpoint, airport_icao, latitude, longitude, alt, isminalt, ismaxalt, isaltatlegstart, remark, supp_info, is_alternate) VALUES (";
        $query .= join(",", array(
            DbHelper::getDbIntValue($flightrouteId),
            DbHelper::getDbIntValue($sortOrder),
            DbHelper::getDbStringValue($dbService, $waypoint->type),
            DbHelper::getDbStringValue($dbService, $waypoint->frequency),
            DbHelper::getDbStringValue($dbService, $waypoint->callsign),
            DbHelper::getDbStringValue($dbService, $waypoint->checkpoint),
            DbHelper::getDbStringValue($dbService, $waypoint->airportIcao),
            DbHelper::getDbFloatValue($waypoint->position->latitude),
            DbHelper::getDbFloatValue($waypoint->position->longitude),
            DbHelper::getDbIntValue((int) $waypoint->wpAltitude->altitude->getHeightAmsl()->getFt()),
            DbHelper::getDbBoolValue($waypoint->wpAltitude->isMinAlt),
            DbHelper::getDbBoolValue($waypoint->wpAltitude->isMaxAlt),
            DbHelper::getDbBoolValue($waypoint->wpAltitude->isAltAtLegStart),
            DbHelper::getDbStringValue($dbService, $waypoint->remark),
            DbHelper::getDbStringValue($dbService, $waypoint->suppInfo),
            DbHelper::getDbBoolValue($waypoint->isAlternate)
        ));

        return $query;
    }
}
