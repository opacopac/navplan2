<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\ConsumptionUnit;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Domain\Model\IDbResult;


class DbFlightrouteConverter {
    public static function fromDbRow(array $row): Flightroute {
        $acSpeed = StringNumberHelper::isNullOrEmpty($row, DbTableFlightroute::COL_AC_SPEED)
            ? NULL
            : new Speed(StringNumberHelper::parseFloatOrZero($row, DbTableFlightroute::COL_AC_SPEED), SpeedUnit::KT);
        $acConsumption = StringNumberHelper::isNullOrEmpty($row, DbTableFlightroute::COL_AC_CONSUMPTION)
            ? NULL
            : new Consumption(StringNumberHelper::parseFloatOrZero($row, DbTableFlightroute::COL_AC_CONSUMPTION), ConsumptionUnit::L_PER_H);
        $extraFuel = StringNumberHelper::isNullOrEmpty($row, DbTableFlightroute::COL_EXTRA_FUEL)
            ? NULL
            : StringNumberHelper::parseFloatOrZero($row, DbTableFlightroute::COL_EXTRA_FUEL);

        return new Flightroute(
            intval($row[DbTableFlightroute::COL_ID]),
            $row[DbTableFlightroute::COL_TITLE],
            $acSpeed,
            $acConsumption,
            $extraFuel,
            $row[DbTableFlightroute::COL_COMMENTS],
            StringNumberHelper::parseStringOrNull($row, DbTableFlightroute::COL_SHARE_ID),
            StringNumberHelper::parseStringOrNull($row, DbTableFlightroute::COL_MD5_HASH),
            [],
            NULL
        );
    }


    /**
     * @param IDbResult $result
     * @return Flightroute[]
     */
    public static function fromDbResult(IDbResult $result): array {
        $routes = [];
        while ($row = $result->fetch_assoc()) {
            $routes[] = DbFlightrouteConverter::fromDbRow($row);
        }

        return $routes;
    }
}
