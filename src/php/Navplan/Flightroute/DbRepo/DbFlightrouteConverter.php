<?php declare(strict_types=1);

namespace Navplan\Flightroute\DbRepo;

use Navplan\Common\DomainModel\Consumption;
use Navplan\Common\DomainModel\ConsumptionUnit;
use Navplan\Common\DomainModel\Speed;
use Navplan\Common\DomainModel\SpeedUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbFlightrouteConverter {
    public static function fromDbRow(array $row): Flightroute {
        $acSpeed = StringNumberHelper::isNullOrEmpty($row, "aircraft_speed")
            ? NULL
            : new Speed(StringNumberHelper::parseFloatOrZero($row, "aircraft_speed"), SpeedUnit::KT);
        $acConsumption = StringNumberHelper::isNullOrEmpty($row, "aircraft_consumption")
            ? NULL
            : new Consumption(StringNumberHelper::parseFloatOrZero($row, "aircraft_consumption"), ConsumptionUnit::L_PER_H);
        $extraFuel = StringNumberHelper::isNullOrEmpty($row, "extra_fuel")
            ? NULL
            : StringNumberHelper::parseFloatOrZero($row, "extra_fuel");

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
            DbHelper::getDbFloatValue($flightroute->aircraftSpeed->getKt(), "''"),
            DbHelper::getDbFloatValue($flightroute->aircraftConsumption->getLph(), "''"),
            DbHelper::getDbFloatValue($flightroute->extraFuelL, "''"),
            DbHelper::getDbStringValue($dbService, $flightroute->comments),
            DbHelper::getDbStringValue($dbService, $flightroute->shareId),
            DbHelper::getDbStringValue($dbService, $flightroute->hash)
        ));
        $query .= ")";

        return $query;
    }


    public static function toUpdateSql(IDbService $dbService, Flightroute $flightroute, int $userId): string {
        $query = "UPDATE navplan SET ";
        $query .= join(", ", array(
            "title=" . DbHelper::getDbStringValue($dbService, $flightroute->title),
            "aircraft_speed=" . DbHelper::getDbFloatValue($flightroute->aircraftSpeed->getKt(), "''"),
            "aircraft_consumption=" . DbHelper::getDbFloatValue($flightroute->aircraftConsumption->getLph(), "''"),
            "extra_fuel=" . DbHelper::getDbFloatValue($flightroute->extraFuelL),
            "comments=" . DbHelper::getDbStringValue($dbService, $flightroute->comments),
            "share_id=" . DbHelper::getDbStringValue($dbService, $flightroute->shareId),
            "md5_hash=" . DbHelper::getDbStringValue($dbService, $flightroute->hash)
        ));
        $query .= " WHERE id=" . DbHelper::getDbIntValue($flightroute->id);
        $query .= "  AND";
        $query .= " id_user=" . DbHelper::getDbIntValue($userId);

        return $query;
    }


    public static function toDeleteSql(int $flightrouteId): string {
        return "DELETE FROM navplan WHERE id=" . DbHelper::getDbIntValue($flightrouteId);
    }
}
