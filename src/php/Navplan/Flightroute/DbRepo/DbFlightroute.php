<?php declare(strict_types=1);

namespace Navplan\Flightroute\DbRepo;

use Navplan\Db\UseCase\IDbService;
use Navplan\Db\MySqlDb\DbHelper;
use Navplan\Flightroute\Domain\Flightroute;
use Navplan\Shared\StringNumberHelper;


class DbFlightroute {
    public static function fromDbResult(array $rs): Flightroute {
        $acSpeed = StringNumberHelper::isNullOrEmpty($rs, "aircraft_speed") ? NULL : StringNumberHelper::parseFloatOrZero($rs, "aircraft_speed");
        $acConsumption = StringNumberHelper::isNullOrEmpty($rs, "aircraft_consumption") ? NULL : StringNumberHelper::parseFloatOrZero($rs, "aircraft_consumption");
        $extraFuel = StringNumberHelper::isNullOrEmpty($rs, "extra_fuel") ? NULL : StringNumberHelper::parseFloatOrZero($rs, "extra_fuel");

        return new Flightroute(
            intval($rs["id"]),
            $rs["title"],
            $acSpeed,
            $acConsumption,
            $extraFuel,
            $rs["comments"],
            StringNumberHelper::parseStringOrNull($rs, "shareId"),
            StringNumberHelper::parseStringOrNull($rs, "md5_hash"),
            [],
            NULL
        );
    }


    public static function toInsertSql(IDbService $dbService, Flightroute $flightroute, ?int $userId): string {
        $query = "INSERT INTO navplan (user_id, title, aircraft_speed, aircraft_consumption, extra_fuel, comments, share_id, md5_hash) VALUES (";
        $query .= join(", ", array(
            DbHelper::getIntValue($userId),
            DbHelper::getStringValue($dbService, $flightroute->title),
            DbHelper::getFloatValue($flightroute->aircraftSpeedKt, "''"),
            DbHelper::getFloatValue($flightroute->aircraftConsumptionLpH, "''"),
            DbHelper::getFloatValue($flightroute->extraFuelL, "''"),
            DbHelper::getStringValue($dbService, $flightroute->comments),
            DbHelper::getStringValue($dbService, $flightroute->shareId),
            DbHelper::getStringValue($dbService, $flightroute->hash)
        ));
        $query .= ")";

        return $query;
    }


    public static function toUpdateSql(IDbService $dbService, Flightroute $flightroute): string {
        $query = "UPDATE navplan SET ";
        $query .= join(", ", array(
            "title=" . DbHelper::getStringValue($dbService, $flightroute->title),
            "aircraft_speed=" . DbHelper::getFloatValue($flightroute->aircraftSpeedKt, "''"),
            "aircraft_consumption=" . DbHelper::getFloatValue($flightroute->aircraftConsumptionLpH, "''"),
            "extra_fuel=" . DbHelper::getFloatValue($flightroute->extraFuelL),
            "comments=" . DbHelper::getStringValue($dbService, $flightroute->comments),
            "share_id=" . DbHelper::getStringValue($dbService, $flightroute->shareId),
            "md5_hash=" . DbHelper::getStringValue($dbService, $flightroute->hash)
        ));
        $query .= " WHERE id=" . DbHelper::getIntValue($flightroute->id);

        return $query;
    }


    public static function toDeleteSql(int $flightrouteId): string {
        return "DELETE FROM navplan WHERE id=" . DbHelper::getIntValue($flightrouteId);
    }
}
