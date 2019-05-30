<?php declare(strict_types=1);

namespace Navplan\Notam\DbRepo;

use Navplan\Notam\Domain\Notam;
use Navplan\Shared\StringNumberService;


class DbNotam {
    public static function fromDbResult(array $rs): Notam {
        $notam = json_decode($rs["notam"], true);

        return new Notam(
            intval($rs["id"]),
            $notam["StateCode"],
            $notam["StateName"],
            $notam["id"],
            StringNumberService::parseStringOrNull($notam, "entity"),
            StringNumberService::parseStringOrNull($notam, "status"),
            StringNumberService::parseStringOrNull($notam, "Qcode"),
            StringNumberService::parseStringOrNull($notam, "Area"),
            StringNumberService::parseStringOrNull($notam, "SubArea"),
            StringNumberService::parseStringOrNull($notam, "Condition"),
            StringNumberService::parseStringOrNull($notam, "Subject"),
            StringNumberService::parseStringOrNull($notam, "Modifier"),
            StringNumberService::parseStringOrNull($notam, "message"),
            $notam["startdate"],
            $notam["enddate"],
            $notam["all"],
            $notam["location"],
            boolval($notam["isICAO"]),
            $notam["Created"],
            $notam["key"],
            $notam["type"],
            DbNotamGeometry::fromDbResult($rs)
        );
    }
}
