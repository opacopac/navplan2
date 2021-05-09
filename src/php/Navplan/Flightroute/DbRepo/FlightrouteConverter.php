<?php declare(strict_types=1);

namespace Navplan\Flightroute\DbRepo;

use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Flightroute;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class FlightrouteConverter {
    public static function fromDbRow(array $row): Flightroute {
        $acSpeed = StringNumberHelper::isNullOrEmpty($row, "aircraft_speed") ? NULL : StringNumberHelper::parseFloatOrZero($row, "aircraft_speed");
        $acConsumption = StringNumberHelper::isNullOrEmpty($row, "aircraft_consumption") ? NULL : StringNumberHelper::parseFloatOrZero($row, "aircraft_consumption");
        $extraFuel = StringNumberHelper::isNullOrEmpty($row, "extra_fuel") ? NULL : StringNumberHelper::parseFloatOrZero($row, "extra_fuel");

        return new Flightroute(
            intval($row["id"]),
            $row["title"],
            $acSpeed,
            $acConsumption,
            $extraFuel,
            $row["comments"],
            StringNumberHelper::parseStringOrNull($row, "shareId"),
            StringNumberHelper::parseStringOrNull($row, "md5_hash"),
            [],
            NULL
        );
    }


    public static function toInsertSql(IDbService $dbService, Flightroute $flightroute, ?int $userId): string {
        $query = "INSERT INTO navplan (user_id, title, aircraft_speed, aircraft_consumption, extra_fuel, comments, share_id, md5_hash) VALUES (";
        $query .= join(", ", array(
            DbHelper::getDbIntValue($userId),
            DbHelper::getDbStringValue($dbService, $flightroute->title),
            DbHelper::getDbFloatValue($flightroute->aircraftSpeedKt, "''"),
            DbHelper::getDbFloatValue($flightroute->aircraftConsumptionLpH, "''"),
            DbHelper::getDbFloatValue($flightroute->extraFuelL, "''"),
            DbHelper::getDbStringValue($dbService, $flightroute->comments),
            DbHelper::getDbStringValue($dbService, $flightroute->shareId),
            DbHelper::getDbStringValue($dbService, $flightroute->hash)
        ));
        $query .= ")";

        return $query;
    }


    public static function toUpdateSql(IDbService $dbService, Flightroute $flightroute): string {
        $query = "UPDATE navplan SET ";
        $query .= join(", ", array(
            "title=" . DbHelper::getDbStringValue($dbService, $flightroute->title),
            "aircraft_speed=" . DbHelper::getDbFloatValue($flightroute->aircraftSpeedKt, "''"),
            "aircraft_consumption=" . DbHelper::getDbFloatValue($flightroute->aircraftConsumptionLpH, "''"),
            "extra_fuel=" . DbHelper::getDbFloatValue($flightroute->extraFuelL),
            "comments=" . DbHelper::getDbStringValue($dbService, $flightroute->comments),
            "share_id=" . DbHelper::getDbStringValue($dbService, $flightroute->shareId),
            "md5_hash=" . DbHelper::getDbStringValue($dbService, $flightroute->hash)
        ));
        $query .= " WHERE id=" . DbHelper::getDbIntValue($flightroute->id);

        return $query;
    }


    public static function toDeleteSql(int $flightrouteId): string {
        return "DELETE FROM navplan WHERE id=" . DbHelper::getDbIntValue($flightrouteId);
    }
}
