<?php declare(strict_types=1);

namespace Navplan\Notam\DbRepo;

use Navplan\Notam\Domain\Notam;
use Navplan\Shared\StringNumberHelper;


class DbNotam {
    public static function fromDbResult(array $rs): Notam {
        $notam = json_decode($rs["notam"], true);

        return new Notam(
            intval($rs["id"]),
            $notam["StateCode"],
            $notam["StateName"],
            $notam["id"],
            StringNumberHelper::parseStringOrNull($notam, "entity"),
            StringNumberHelper::parseStringOrNull($notam, "status"),
            StringNumberHelper::parseStringOrNull($notam, "Qcode"),
            StringNumberHelper::parseStringOrNull($notam, "Area"),
            StringNumberHelper::parseStringOrNull($notam, "SubArea"),
            StringNumberHelper::parseStringOrNull($notam, "Condition"),
            StringNumberHelper::parseStringOrNull($notam, "Subject"),
            StringNumberHelper::parseStringOrNull($notam, "Modifier"),
            StringNumberHelper::parseStringOrNull($notam, "message"),
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
