<?php declare(strict_types=1);

namespace Navplan\Flightroute\DbRepo;

use Navplan\Db\UseCase\IDbService;
use Navplan\Db\MySqlDb\DbHelper;
use Navplan\Flightroute\Domain\Waypoint;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Shared\StringNumberHelper;


class DbWaypoint {
    public static function fromDbResult(array $rs): Waypoint {
        return new Waypoint(
            $rs["type"],
            $rs["freq"],
            $rs["callsign"],
            $rs["checkpoint"],
            $rs["alt"],
            $rs["isminalt"] === 1,
            $rs["ismaxalt"] === 1,
            $rs["isaltatlegstart"] === 1,
            $rs["remark"],
            StringNumberHelper::parseStringOrNull($rs, "supp_info"),
            self::getPositionFromDbResult($rs),
            StringNumberHelper::parseStringOrNull($rs, "airport_icao"),
        $rs["is_alternate"] === 1
        );
    }


    private static function getPositionFromDbResult(array $rs): ?Position2d {
        if (StringNumberHelper::isNullOrEmpty($rs, "latitude") || StringNumberHelper::isNullOrEmpty($rs, "longitude")) {
            return NULL;
        }

        return new Position2d(
            floatval($rs["longitude"]),
            floatval($rs["latitude"])
        );
    }


    public static function toInsertSql(IDbService $dbService, Waypoint $waypoint, int $flightrouteId, int $sortOrder): string {
        $query = "INSERT INTO navplan_waypoints (navplan_id, sortorder, type, freq, callsign, checkpoint, airport_icao, latitude, longitude, alt, isminalt, ismaxalt, isaltatlegstart, remark, supp_info, is_alternate) VALUES (";
        $query .= join(",", array(
            DbHelper::getIntValue($flightrouteId),
            DbHelper::getIntValue($sortOrder),
            DbHelper::getStringValue($dbService, $waypoint->type),
            DbHelper::getStringValue($dbService, $waypoint->frequency),
            DbHelper::getStringValue($dbService, $waypoint->callsign),
            DbHelper::getStringValue($dbService, $waypoint->checkpoint),
            DbHelper::getStringValue($dbService, $waypoint->airportIcao),
            DbHelper::getFloatValue($waypoint->position->latitude),
            DbHelper::getFloatValue($waypoint->position->longitude),
            DbHelper::getStringValue($dbService, $waypoint->altitude),
            DbHelper::getBoolValue($waypoint->isMinAlt),
            DbHelper::getBoolValue($waypoint->isMaxAlt),
            DbHelper::getBoolValue($waypoint->isAltAtLegStart),
            DbHelper::getStringValue($dbService, $waypoint->remark),
            DbHelper::getStringValue($dbService, $waypoint->suppInfo),
            DbHelper::getBoolValue($waypoint->isAlternate)
        ));

        return $query;
    }
}
